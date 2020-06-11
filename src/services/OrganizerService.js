const organizerModel = require("../model/OrganizerModel");
const auth = require("../Authentication");

module.exports = {

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
    createOrganizer : (res, organizer, password) => {
        auth.generateHash(password)
            .then(response => {
                organizer.salt = response.salt;
                organizer.hash = response.hash;
                organizer.iterations = response.iterations;

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
            })
            .catch(err => {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Failed to encrypt organizer password",
                            msgError: true
                        }
                    });
            });
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

    // logs in an organizer
    loginOrganizer: (res, username, password) => {
        organizerModel.find({username: username}, (err, document) => {
            if (err || !document) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to find organizer",
                            msgError: true
                        }
                    });
            } else {
                auth.verifyPassword(document.salt, document.hash, document.iterations, password)
                    .then(response => {
                        res.status(200).json(response);
                    })
                    .catch(err => {
                        res.status(500).json(
                            {
                                message: {
                                    msgBody: "Incorrect password",
                                    msgError: true
                                }
                            });
                    })
            }
        });
    }
}