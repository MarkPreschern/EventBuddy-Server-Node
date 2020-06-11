const apiKey = "JXfugI8vtmG4dlSSSa1CUyzGeMa91d9V";

const url = (endpoint, params) => {
    params.apikey = apiKey;
    return "https://app.ticketmaster.com/discovery/v2"
           + `${endpoint}.json?`
           + new URLSearchParams(params);
};

// formats TicketMaster event to EventModel data
// *** due to TicketMaster event data having numerous optional data, many checks for specific ***
// *** data must be performed when formatting to EventModel data                              ***
const formatSingleton = (event) => {
    // creates event(s)
    const EventModel = {
        _id: event.id,
        image_url: (event.images.length > 0) ? event.images[0].url : "",
        name: event.name,
        start_date: event.dates.start.localDate,
        url: event.url,
        external: true,
        integrated: false
    };
    return getVenue(event).then(venueModel => {
        if (venueModel !== -1) {
            EventModel.venue = venueModel;
        }
        if (event.hasOwnProperty("description")) {
            EventModel.description = event.description
        }
        if (event.hasOwnProperty("info")) {
            EventModel.info = event.info
        }
        if (event.hasOwnProperty("accessibility")) {
            EventModel.accessibility = event.accessibility.info
        }
        if (event.hasOwnProperty("ticketLimit")) {
            EventModel.ticketLimit = event.ticketLimit.info
        }
        if (event.hasOwnProperty("pleaseNote")) {
            EventModel.pleaseNote = event.pleaseNote.info
        }

        return EventModel;
    });
};

// formats multiple events
const format = async (data) => {
    if (!data.hasOwnProperty('_embedded')) {
        return [];
    } else {
        const events = data._embedded.events;

        let eventModels = [];
        for (let event of events) {
            const EventModel = await formatSingleton(event);
            eventModels.push(EventModel);
        }

        return eventModels;
    }
};

// creates venue
const getVenue = async (event) => {
    if (event.hasOwnProperty("_embedded")) {
        const embedded = event._embedded;
        if (embedded.hasOwnProperty("venues")) {
            const venues = embedded.venues;

            let venueNames = [];
            let venueCountry = "";
            let venueState = "";
            let venueCity = "";
            let venueAddress = "";
            await venues.forEach(venue => {
                venueNames.push(venue.name);
                venueCountry = venue.country.name;
                venueState = (venue.state === undefined ? "" : venue.state.stateCode);
                venueCity = venue.city.name;
                venueAddress = venue.address.line1;
            });

            return {
                name: venueNames.join(" & "),
                country: venueCountry,
                state: venueState,
                city: venueCity,
                address: venueAddress
            }
        } else {
            return -1;
        }
    } else {
        return -1;
    }
};

module.exports = {

    getEvents : (params) => {
        return fetch(url("/events", params))
            .then(result => {
                return result.json();
            })
            .then(data => {
                console.log(data);
                return format(data);
            });
    },

    getEvent : (res, _id) => {
        return fetch(url(`/events/${_id}`, {}))
            .then(result => {
                return result.json();
            })
            .then(data => {
                return formatSingleton(data);
            })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json(
                    {
                        message: {
                            msgBody: err.message,
                            msgError: true
                        }
                    }
                )
            });
    },
};