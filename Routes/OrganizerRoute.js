const express = require("express");
const organizerRouter = express.Router();
const organizerService = require("../services/OrganizerService");

//read organizer by id
organizerRouter.get("/:organizerId", (req, res) => {
    organizerService.getOrganizer(res, req.params.organizerId);
});

//create organizer
organizerRouter.post("/", (req, res) => {
    organizerService.createOrganizer(res, req.body);
});

//delete organizer by id
organizerRouter.delete("/:organizerId", (req, res) => {
    organizerService.deleteOrganizer(res, req.params.organizerId);
});

//update organizer by id
organizerRouter.put("/:organizerId", (req, res) => {
    organizerService.updateOrganizer(res, req.params.organizerId, req.body);
});

module.exports = organizerRouter;