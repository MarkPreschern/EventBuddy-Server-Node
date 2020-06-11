const express = require("express");
const venueRouter = express.Router();
const venueService = require("../services/VenueService");

//read venue by id
venueRouter.get("/:venueId", (req, res) => {
    venueService.getVenue(res, req.params.venueId);
});

//create venue
venueRouter.post("/", (req, res) => {
    venueService.createVenue(res, req.params.organizerId, req.body);
});

//delete venue by id
venueRouter.delete("/:venueId", (req, res) => {
    venueService.deleteVenue(res, req.params.organizerId, req.params.venueId);
});

//update venue by id
venueRouter.put("/:venueId", (req, res) => {
    venueService.updateVenue(res, req.params.organizerId, req.params.venueId, req.body);
});

module.exports = venueRouter;