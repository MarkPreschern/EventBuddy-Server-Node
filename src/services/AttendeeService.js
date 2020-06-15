const attendeeModel = require("../model/AttendeeModel");
const auth = require ("../Authentication");

module.exports = {

    // gets an attendee and populates its sub-documents
    getAttendee: (res, attendeeId) => {
        attendeeModel.findOne({_id: attendeeId})
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
                        msgError: true,
                        error: err
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
                                    msgError: true,
                                    error: err
                                }
                            });
                    } else {
                        document = document.toObject();
                        delete document.salt;
                        delete document.hash;
                        delete document.iterations;
                        res.status(200).json(document);
                    }
                })
            })
            .catch(err => {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Failed to encrypt attendee password",
                            msgError: true,
                            error: err
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
                            msgError: true,
                            error: err
                        }
                    });
            } else {
                res.status(200);
            }
        })
    },

    // updates an attendee
    updateAttendee: (res, attendeeId, attendee) => {
        attendeeModel.findOneAndUpdate({_id: attendeeId}, attendee, {runValidators: true, new: true})
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
            .then(document => {
                res.status(200).json(document);
            }).catch(err => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to update attendee",
                        msgError: true,
                        error: err
                    }
                });
            });
    },

    // adds a liked event to attendee
    addLikedEvent : (res, attendeeId, eventId) => {
        attendeeModel.update(
            { _id: attendeeId},
            { $push: { events_liked: eventId }},
            {runValidators: true, new: true}
        ).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to add liked event",
                        msgError: true,
                        error: err
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
                        msgError: true,
                        error: err
                    }
                });
        });
    },

    // logs in an attendee
    loginAttendee: (res, username, password) => {
        attendeeModel.findOne({username: username})
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
            .select("+salt")
            .select("+hash")
            .select("+iterations")
            .then(document => {
                auth.verifyPassword(document.salt, document.hash, document.iterations, password)
                    .then(response => {
                        document = document.toObject();
                        delete document.salt;
                        delete document.hash;
                        delete document.iterations;
                        res.status(200).json(document);
                    })
                    .catch(err => {
                        res.status(500).json(
                            {
                                message: {
                                    msgBody: "Incorrect password",
                                    msgError: true,
                                    error: err
                                }
                            });
                    })
            })
            .catch(err => {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to find attendee",
                            msgError: true,
                            error: err
                        }
                    });
            });
    }
};