const express = require("express");
const attendeeRouter = express.Router();
const Attendee = require("../model/AttendeeModel");

//read attendee
attendeeRouter.get("/", (req, res) => {
    Attendee.find({}, (err, response) => {
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
});

//read attendee by id
attendeeRouter.get("/:id", (req, res) => {
    Attendee.find(req.params.id, (err, response) => {
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
});


//create attendee
attendeeRouter.post("/", (req, res) => {
    const attendee = new Attendee(req.body);
    attendee.save((err, document) => {
        if (err) {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to add attendee",
                        msgError: true
                    }
                });
        } else {
            res.status(200).json(
                {
                    message: {
                        msgBody: document,
                        msgError: false
                    }
                });
        }
    })
});

//delete attendee by id
attendeeRouter.delete("/:id", (req, res) => {
    Attendee.findByIdAndDelete(req.params.id, err => {
        if (err) {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to delete attendee",
                        msgError: true
                    }
                });
        } else {
            res.status(200).json(
                {
                    message: {
                        msgBody: "Successfully deleted attendee",
                        msgError: false
                    }
                });
        }
    })
});

//update attendee by id
attendeeRouter.put(":id", (req, res) => {
    Attendee.findOneAndUpdate(req.params.id, req.body, {runValidators: true}, (err, response) => {
        if (err) {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to update attendee",
                        msgError: true
                    }
                });
        } else {
            res.status(200).json(
                {
                    message: {
                        msgBody: "Successfully updated attendee",
                        msgError: false
                    }
                });
        }
    })
});

module.exports = attendeeRouter;