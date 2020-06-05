const express = require("express");
const attendeeRouter = express.Router();
const attendeeService = require("../services/AttendeeService");

//read attendee by id
attendeeRouter.get("/:attendeeId", (req, res) => {
    attendeeService.getAttendee(res, req.params.attendeeId);
});

//create attendee
attendeeRouter.post("/", (req, res) => {
    attendeeService.createAttendee(res, req.body);
});

//delete attendee by id
attendeeRouter.delete("/:attendeeId", (req, res) => {
    attendeeService.deleteAttendee(res, req.params.attendeeId);
});

//update attendee by id
attendeeRouter.put(":attendeeId", (req, res) => {
    attendeeService.updateAttendee(res, req.params.attendeeId, req.body);
});

module.exports = attendeeRouter;