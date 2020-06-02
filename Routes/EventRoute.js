const express = require("express");
const eventRouter = express.Router();
const Event = require("../model/EventModel");

//read event
eventRouter.get("/", (req, res) => {
    Event.find({}, (err, response) => {
        if (err) {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to get events",
                        msgError: true
                    }
                });
        } else {
            res.status(200).json(response);
        }
    });
});

//read event by id
eventRouter.get("/:id", (req, res) => {
    Event.find(req.params.id, (err, response) => {
        if (err) {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to get event",
                        msgError: true
                    }
                });
        } else {
            res.status(200).json(response);
        }
    });
});


//create event
eventRouter.post("/", (req, res) => {
    const event = new Event(req.body);
    event.save((err, document) => {
        if (err) {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to add event",
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

//delete event by id
eventRouter.delete("/:id", (req, res) => {
    Event.findByIdAndDelete(req.params.id, err => {
        if (err) {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to delete event",
                        msgError: true
                    }
                });
        } else {
            res.status(200).json(
                {
                    message: {
                        msgBody: "Successfully deleted event",
                        msgError: false
                    }
                });
        }
    })
});

//update event by id
eventRouter.put(":id", (req, res) => {
    Event.findOneAndUpdate(req.params.id, req.body, {runValidators: true}, (err, response) => {
        if (err) {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to update event",
                        msgError: true
                    }
                });
        } else {
            res.status(200).json(
                {
                    message: {
                        msgBody: "Successfully updated event",
                        msgError: false
                    }
                });
        }
    })
});

module.exports = eventRouter;