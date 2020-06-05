const attendeeModel = require("../model/AttendeeModel");

export default {

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
                                      populate: [
                                          {
                                              path: 'sender'
                                          },
                                          {
                                              path: 'receiver'
                                          }
                                      ]
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
    createAttendee: (res, attendee) => {
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
    }
}