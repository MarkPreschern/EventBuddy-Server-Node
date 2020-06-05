const express = require("express");
const attendeeRouter = express.Router();
const attendeeService = require("../services/AttendeeService");

//read attendee
attendeeRouter.get("/", (req, res) => {
    attendeeService.getAttendees(res);
});

//read attendee by id
attendeeRouter.get("/:id", (req, res) => {
    attendeeService.getAttendee(res, req.params.id);
});

//create attendee
attendeeRouter.post("/", (req, res) => {
    attendeeService.createAttendee(res, req.body);
});

//delete attendee by id
attendeeRouter.delete("/:id", (req, res) => {
    attendeeService.deleteAttendee(res, req.params.id);
});

//update attendee by id
attendeeRouter.put(":id", (req, res) => {
    attendeeService.updateAttendee(res, req.params.id, req.body);
});

module.exports = attendeeRouter;