const express = require("express");
const organizerRouter = express.Router();
const organizerService = require("../services/OrganizerService");

//read organizer
organizerRouter.get("/", (req, res) => {
    organizerService.getOrganizers(res);
});

//read organizer by id
organizerRouter.get("/:id", (req, res) => {
    organizerService.getOrganizer(res, req.params.id);
});

//create organizer
organizerRouter.post("/", (req, res) => {
    organizerService.createOrganizer(res, req.body);
});

//delete organizer by id
organizerRouter.delete("/:id", (req, res) => {
    organizerService.deleteOrganizer(res, req.params.id);
});

//update organizer by id
organizerRouter.put(":id", (req, res) => {
    organizerService.updateOrganizer(res, req.params.id, req.body);
});

module.exports = organizerRouter;