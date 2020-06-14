const organizerModel = require("../model/OrganizerModel");
const auth = require("../Authentication");

module.exports = {

    // gets an organizer
    getOrganizer : (res, organizerId) => {
        organizerModel.findOne({_id: organizerId})
            .populate('venues')
            .then(response => {
                res.status(200).json(response);
            }).catch(err => {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to get organizer",
                            msgError: true,
                            error: err
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
                                    msgError: true,
                                    error: err
                                }
                            });
                    } else {
                        document = document.toObject();
                        delete document.salt;
                        delete document.hash;
                        delete document.iterations;
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
        organizerModel.findOneAndUpdate({_id: organizerId}, organizer, {runValidators: true, new: true}, (err, document) => {
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
        organizerModel.findOne({username: username})
            .select("+salt")
            .select("+hash")
            .select("+iterations")
            .then(document => {
                auth.verifyPassword(document.salt, document.hash, document.iterations, password)
                    .then(response => {
                        document = document.toObject();
                        delete document.salt;
                        delete document.hash;
                        delete document.iterations;
                        res.status(200).json(document);
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
            })
            .catch(err => {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to find organizer",
                            msgError: true
                        }
                    });
            });
    }
};