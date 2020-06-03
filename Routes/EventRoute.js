import TicketMasterService from "../services/TicketMasterService"

const express = require("express");
const eventRouter = express.Router();
const Event = require("../model/EventModel");

//read event
eventRouter.get("/:city?:startDateTime?:endDateTime?:keyword?", async (req, res) => {
    const city = req.params.city;
    const startDateTime = req.params.city;
    const endDateTime = req.params.city;
    const keyword = req.params.city;

    // set parameters
    const params = {};
    if (city !== undefined) {
        params.city = city;
    }
    if (startDateTime !== undefined && endDateTime !== undefined) {
        params.startDateTime = startDateTime;
        params.endDateTime = endDateTime;
    }
    if (keyword !== undefined) {
        params.keyword = keyword;
    }

    // get events and TicketMaster events
    const [err, response] = await Event.find(params).limit(20);
    const [err2, response2] = await TicketMasterService.getEvents(params);

    if (err && err2) {
        res.status(500).json(
            {
                message: {
                    msgBody: "Unable to get events",
                    msgError: true
                }
            });
    } else if (err) {
        res.status(200).json(response2);
    } else if (err2) {
        res.status(200).json(response);
    } else {
        res.status(200).json([...response, ...response2]);
    }
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

//read event by id from TicketMaster API
eventRouter.get("/external/:id", (req, res) => {
    TicketMasterService.getEvent(req.params.id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(
            {
                message: {
                    msgBody: err.message,
                    msgError: true
                }
            }
        ));
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