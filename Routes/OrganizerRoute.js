const express = require("express");
const organizerRouter = express.Router();
const Organizer = require("../model/OrganizerModel");

//read organizer
organizerRouter.get("/", (req, res) => {
    Organizer.find({}, (err, response) => {
        if (err) {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to get organizers",
                        msgError: true
                    }
                });
        } else {
            res.status(200).json(response);
        }
    });
});

//read organizer by id
organizerRouter.get("/:id", (req, res) => {
    Organizer.find(req.params.id, (err, response) => {
        if (err) {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to get organizer",
                        msgError: true
                    }
                });
        } else {
            res.status(200).json(response);
        }
    });
});


//create organizer
organizerRouter.post("/", (req, res) => {
    const organizer = new Organizer(req.body);
    organizer.save((err, document) => {
        if (err) {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to add organizer",
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

//delete organizer by id
organizerRouter.delete("/:id", (req, res) => {
    Organizer.findByIdAndDelete(req.params.id, err => {
        if (err) {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to delete organizer",
                        msgError: true
                    }
                });
        } else {
            res.status(200).json(
                {
                    message: {
                        msgBody: "Successfully deleted organizer",
                        msgError: false
                    }
                });
        }
    })
});

//update organizer by id
organizerRouter.put(":id", (req, res) => {
    Organizer.findOneAndUpdate(req.params.id, req.body, {runValidators: true}, (err, response) => {
        if (err) {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to update organizer",
                        msgError: true
                    }
                });
        } else {
            res.status(200).json(
                {
                    message: {
                        msgBody: "Successfully updated organizer",
                        msgError: false
                    }
                });
        }
    })
});

module.exports = organizerRouter;