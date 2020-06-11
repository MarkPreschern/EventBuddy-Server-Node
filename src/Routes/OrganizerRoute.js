const express = require("express");
const organizerRouter = express.Router();
const organizerService = require("../services/OrganizerService");

//read organizer by id
organizerRouter.get("/:organizerId", (req, res) => {
    organizerService.getOrganizer(res, req.params.organizerId);
});

//create organizer
organizerRouter.post("/", (req, res) => {
    organizerService.createOrganizer(res, req.body, req.body.password);
});

//delete organizer by id
organizerRouter.delete("/:organizerId", (req, res) => {
    organizerService.deleteOrganizer(res, req.params.organizerId);
});

//update organizer by id
organizerRouter.put("/:organizerId", (req, res) => {
    organizerService.updateOrganizer(res, req.params.organizerId, req.body);
});

//log in organizer
organizerRouter.post("/login", (req, res) => {
    organizerService.loginOrganizer(res, req.body.username, req.body.password);
});


module.exports = organizerRouter;