const organizerModel = require("../model/OrganizerModel");

export default {

    getOrganizer : (res, organizerId) => {
        organizerModel.find(organizerId, (err, response) => {
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
    },

    createOrganizer : (res, organizer) => {
        new Organizer(organizer).save((err, document) => {
            if (err) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to add organizer",
                            msgError: true
                        }
                    });
            } else {
                res.status(200).json(document);
            }
        })
    },

    deleteOrganizer : (res, organizerId) => {
        organizerModel.findByIdAndDelete(organizerId, err => {
            if (err) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to delete organizer",
                            msgError: true
                        }
                    });
            } else {
                res.status(200);
            }
        })
    },

    updateOrganizer : (res, organizerId, organizer) => {
        organizerModel.findOneAndUpdate(organizerId, organizer, {runValidators: true, new: true}, (err, document) => {
            if (err) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to update organizer",
                            msgError: true
                        }
                    });
            } else {
                res.status(200).json(document);
            }
        });
    }
}