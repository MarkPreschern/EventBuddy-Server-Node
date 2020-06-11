const attendeeModel = require("../model/AttendeeModel");
const auth = require ("../Authentication");

module.exports = {

    // gets an attendee and populates its sub-documents
    getAttendee: (res, attendeeId) => {
        attendeeModel.find(attendeeId)
            .populate([
                          {
                              path: 'conversations',
                              populate: [
                                  {
                                      path: 'sender'
                                  },
                                  {
                                      path: 'receiver'
                                  },
                                  {
                                      path: 'messages',
                                      populate:
                                          {
                                              path: 'sender'
                                          }
                                  }]
                          },
                          {
                              path: 'events_liked'
                          }
                      ])
            .then(response => {
                res.status(200).json(response);
            }).catch(err => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to get attendee",
                        msgError: true
                    }
                });
        });
    },

    // creates an attendee
    createAttendee: (res, attendee, password) => {
        auth.generateHash(password)
            .then(response => {
                attendee.salt = response.salt;
                attendee.hash = response.hash;
                attendee.iterations = response.iterations;

                new attendeeModel(attendee).save((err, document) => {
                    if (err) {
                        res.status(500).json(
                            {
                                message: {
                                    msgBody: "Unable to add attendee",
                                    msgError: true
                                }
                            });
                    } else {
                        res.status(200).json(document);
                    }
                })
            })
            .catch(err => {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Failed to encrypt attendee password",
                            msgError: true
                        }
                    });
            });
    },

    // deletes an attendee
    deleteAttendee: (res, attendeeId) => {
        attendeeModel.findByIdAndDelete(attendeeId, err => {
            if (err) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to delete attendee",
                            msgError: true
                        }
                    });
            } else {
                res.status(200);
            }
        })
    },

    // updates an attendee
    updateAttendee: (res, attendeeId, attendee) => {
        attendeeModel.findOneAndUpdate(attendeeId, attendee, {runValidators: true, new: true},
                                       (err, document) => {
                                           if (err) {
                                               res.status(500).json(
                                                   {
                                                       message: {
                                                           msgBody: "Unable to update attendee",
                                                           msgError: true
                                                       }
                                                   });
                                           } else {
                                               res.status(200).json(document);
                                           }
                                       })
    },

    // adds a liked event to attendee
    addLikedEvent : (res, attendeeId, eventId) => {
        attendeeModel.update(
            { _id: attendeeId},
            { $push: { events_liked: eventId }}
        ).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to add liked event",
                        msgError: true
                    }
                });
        });
    },

    // removes a liked event from attendee
    removeLikedEvent : (res, attendeeId, eventId) => {
        attendeeModel.update(
            { _id: attendeeId},
            { $pull: { events_liked: eventId }}
        ).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to remove liked event",
                        msgError: true
                    }
                });
        });
    },

    // logs in an attendee
    loginAttendee: (res, username, password) => {
        attendeeModel.find({username: username}, (err, document) => {
            if (err || !document) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to find attendee",
                            msgError: true
                        }
                    });
            } else {
                auth.verifyPassword(document.salt, document.hash, document.iterations, password)
                    .then(response => {
                        res.status(200).json(response);
                    })
                    .catch(err => {
                        res.status(500).json(
                            {
                                message: {
                                    msgBody: "Incorrect password",
                                    msgError: true
                                }
                            });
                    })
            }
        });
    }
}