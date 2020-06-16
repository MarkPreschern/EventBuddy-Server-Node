const express = require("express");
const eventRouter = express.Router();
import eventService from "../services/EventService";
import ticketMasterService from "../services/TicketMasterService";

//read events
eventRouter.get("/search", (req, res) => {

    // get events and TicketMaster events
    Promise.all([
                    eventService.getEvents(req),
                    ticketMasterService.getEvents(req)])
        .then(values => {
        const response1 = values[0];
        const response2 = values[1];

        const ok1 = !response1.hasOwnProperty('message');
        const ok2 = !response2.hasOwnProperty('message');

        if (ok1 && ok2) {
            res.status(200).json(eventService.uniqueEventsOnly(response1, response2));
        } else if (ok1) {
            res.status(200).json(response1);
        } else if (ok2) {
            res.status(200).json(response2);
        } else {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to get events",
                        msgError: true,
                    }
                });
        }
    }).catch(err => {
        return err;
    });
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