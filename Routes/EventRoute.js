const express = require("express");
const eventRouter = express.Router();
import eventService from "../services/EventService";
import ticketMasterService from "../services/TicketMasterService";

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
    const [err2, response2] = await ticketMasterService.getEvents(params);

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
    eventService.getEvent(res, req.params.id);
});

//read event by id from TicketMaster API
eventRouter.get("/external/:id", (req, res) => {
    ticketMasterService.getEvent(res, req.params.id);
});

//create event
eventRouter.post("/", (req, res) => {
    eventService.createEvent(res, req.body);
});

//delete event by id
eventRouter.delete("/:id", (req, res) => {
    eventService.deleteEvent(res, req.params.id);
});

//update event by id
eventRouter.put(":id", (req, res) => {
    eventService.updateEvent(res, req.params.id, req.body);
});

module.exports = eventRouter;