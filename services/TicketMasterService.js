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
const format = async (data) => {
    if (!data.hasOwnProperty('_embedded')) {
        throw "Unable to get TicketMaster event";
    } else {
        const event = data._embedded.events;

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

        // creates event
        const EventModel = {
            name: event.name,
            start_date: event.dates.start.localDate,
            url: event.url,
            external: true
        };
        const venueModel = await getVenue(event);
        if (venueModel === -1) {
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
    }
};

export default {

    getEvents : (params) => {
        return fetch(url("/events", params)).then(res => {
            return format(res.json());
        });
    },

    getEvent : (_id) => {
        return fetch(url(`/events/${_id}`, {})).then(res => {
            return format(res.json());
        });
    },

}