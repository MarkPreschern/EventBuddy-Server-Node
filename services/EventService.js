const eventModel = require("../model/EventModel");

export default {

    getEvents : (res, params) => {
        eventModel.find(params)
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
                        msgBody: "Unable to get events",
                        msgError: true
                    }
                });
        });
    },

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

    createEvent : (res, event) => {
        new Event(event).save((err, document) => {
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
    }
}