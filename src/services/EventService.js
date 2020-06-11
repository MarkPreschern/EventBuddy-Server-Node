const eventModel = require("../model/EventModel");

module.exports = {

    // gets all events based on given parameters
    getEvents : (params) => {
        return eventModel.find(params)
            .populate([
                          {
                              path: 'venue'
                          },
                          {
                              path: 'organizer'
                          },
                          {
                              path: 'attendee_likes'
                          }
                      ])
            .then(response => {
                return response;
            }).catch(err => {
                console.log(err);
            return {
                message: {
                    msgBody: "Unable to get events",
                    msgError: true,
                }
            };
        });
    },

    // gets an event and populates it's sub-documents
    getEvent : (res, eventId) => {
        eventModel.find(eventId)
            .populate([
                          {
                              path: 'venue'
                          },
                          {
                              path: 'organizer'
                          },
                          {
                              path: 'attendee_likes'
                          }
                      ])
            .then(response => {
                res.status(200).json(response);
            }).catch(err => {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to get event",
                            msgError: true
                        }
                    });
            });
    },

    // creates an event
    createEvent : (res, event) => {
        new eventModel(event).save((err, document) => {
            if (err) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to add event",
                            msgError: true
                        }
                    });
            } else {
                res.status(200).json(document);
            }
        })
    },

    // deletes an event
    deleteEvent : (res, eventId) => {
        eventModel.findByIdAndDelete(eventId, err => {
            if (err) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to delete event",
                            msgError: true
                        }
                    });
            } else {
                res.status(200);
            }
        })
    },

    // updates an event
    updateEvent : (res, eventId, event) => {
        eventModel.findOneAndUpdate(eventId, event, {runValidators: true, new: true}, (err, document) => {
            if (err) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to update event",
                            msgError: true
                        }
                    });
            } else {
                res.status(200).json(document);
            }
        });
    },

    // adds an event attendee
    addEventAttendee : (res, eventId, attendeeId) => {
        eventModel.update(
            { _id: eventId},
            { $push: { attendee_likes: attendeeId }}
        ).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to add event attendee",
                        msgError: true
                    }
                });
        });
    },

    // removes an event attendee
    removeEventAttendee : (res, eventId, attendeeId) => {
        eventModel.update(
            { _id: eventId},
            { $pull: { attendee_likes: attendeeId }}
        ).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to remove event attendee",
                        msgError: true
                    }
                });
        });
    },

    // removes overlap in events between local database events and ticket master events
    uniqueEventsOnly(localEvents, ticketMasterEvents) {
        ticketMasterEvents.filter(ticketMasterEvent => {
                                      for (let localEvent of localEvents) {
                                          if (ticketMasterEvent.url === localEvent.url) {
                                              return true;
                                          }
                                      }
                                      return false;
                                  }
        );
        return [...localEvents, ...ticketMasterEvents];
    }
}