const express = require("express");
const eventRouter = express.Router();
import eventService from "../services/EventService";
import ticketMasterService from "../services/TicketMasterService";

//read events
eventRouter.get("/:city?:startDateTime?:endDateTime?:keyword?", (req, res) => {
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
    const [response1, response2] = Promise.all([
        ticketMasterService.getEvents(params),
        Event.find(params).limit(20)]);

    if (response1.ok && response2.ok) {
        res.status(200).json([...response, ...response2]);
    } else if (response1.ok) {
        res.status(200).json(response1);
    } else if (response2.ok) {
        res.status(200).json(response2);
    } else {
        res.status(500).json(
            {
                message: {
                    msgBody: "Unable to get events",
                    msgError: true
                }
            });
    }
});

//read event by id
eventRouter.get("/:eventId", (req, res) => {
    eventService.getEvent(res, req.params.eventId);
});

//read event by id from TicketMaster API
eventRouter.get("/external/:eventId", (req, res) => {
    ticketMasterService.getEvent(res, req.params.eventId);
});

//create event
eventRouter.post("/", (req, res) => {
    eventService.createEvent(res, req.body);
});

//delete event by id
eventRouter.delete("/:eventId", (req, res) => {
    eventService.deleteEvent(res, req.params.eventId);
});

//update event by id
eventRouter.put("/:eventId", (req, res) => {
    eventService.updateEvent(res, req.params.eventId, req.body);
});

//add attendee like to event
eventRouter.post("/:eventId/attendee/:attendeeId", (req, res) => {
    eventService.addEventAttendee(res, req.params.eventId, req.params.attendeeId);
});

//add attendee like from event
eventRouter.delete("/:eventId/attendee/:attendeeId", (req, res) => {
    eventService.removeEventAttendee(res, req.params.eventId, req.params.attendeeId);
});

module.exports = eventRouter;