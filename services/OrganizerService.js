const organizerModel = require("../model/OrganizerModel");

export default {

    // gets an organizer
    getOrganizer : (res, organizerId) => {
        organizerModel.find(organizerId)
            .populate('venues')
            .then(response => {
                res.status(200).json(response);
            }).catch(err => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to get organizer",
                        msgError: true
                    }
                });
        });
    },

    // creates an organizer
    createOrganizer : (res, organizer) => {
        new organizerModel(organizer).save((err, document) => {
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

    // deletes an organizer
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

    // updates an organizer
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
    },
}