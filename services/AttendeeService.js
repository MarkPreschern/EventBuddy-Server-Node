const attendeeModel = require("../model/AttendeeModel");

export default {

    getAttendees : (res) => {
        attendeeModel.find({}, (err, response) => {
            if (err) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to get attendees",
                            msgError: true
                        }
                    });
            } else {
                res.status(200).json(response);
            }
        });
    },

    getAttendee : (res, attendeeId) => {
        attendeeModel.find(attendeeId, (err, response) => {
            if (err) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to get attendee",
                            msgError: true
                        }
                    });
            } else {
                res.status(200).json(response);
            }
        });
    },

    createAttendee : (res, attendee) => {
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

    deleteAttendee : (res, attendeeId) => {
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

    updateAttendee : (res, attendeeId, attendee) => {
        attendeeModel.findOneAndUpdate(attendeeId, attendee, {runValidators: true, new: true}, (err, document) => {
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