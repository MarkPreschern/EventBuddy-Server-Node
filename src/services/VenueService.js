const venueModel = require("../model/VenueModel");
const organizerModel = require("../model/OrganizerModel");

module.exports = {

    // gets a venue
    getVenue : (res, venueId) => {
        venueModel.findOne({_id: venueId}, (err, response) => {
            if (err) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to get venue",
                            msgError: true,
                            error: err
                        }
                    });
            } else {
                res.status(200).json(response);
            }
        });
    },

    // creates a venue
    createVenue : async (res, organizerId, venue) => {
        const error = (err) => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to add venue",
                        msgError: true,
                        error: err
                    }
                });
        };

        try {
            const newVenue = new venueModel(venue);
            const document = await newVenue.save();

            if (organizerId === "-1") {
                res.status(200).json(document);
            } else {
                organizerModel.update(
                    {_id: organizerId},
                    {$push: {venues: newVenue}}
                ).then(response => {
                    res.status(200).json(document);
                }).catch(err => {
                    error(err);
                });
            }
        } catch (e) {
            error(e);
        }
    },

    // deletes a venue
    deleteVenue : async (res, organizerId, venueId) => {
        const error = (err) => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to delete venue",
                        msgError: true,
                        error: err
                    }
                });
        };

        try {
            const response = await findByIdAndDelete(venueId);

            if (organizerId === "-1") {
                res.status(200).json(response);
            } else {
                organizerModel.update(
                    {_id: organizerId},
                    {$pull: {venues: venueId}}
                ).then(response => {
                    res.status(200).json(response);
                }).catch(err => {
                    error(err);
                });
            }
        } catch (e) {
            error(e);
        }
    },

    // updates a venue
    updateVenue : async (res, organizerId, venueId, venue) => {
        const error = (err) => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to update venue",
                        msgError: true,
                        error: err
                    }
                });
        };

        try {
            const document = venueModel.findOneAndUpdate({_id: venueId}, venue, {runValidators: true, new: true});

            if (organizerId === "-1") {
                res.status(200).json(document);
            } else {
                organizerModel.update(
                    {_id: organizerId},
                    {$set: {venues: venue}}
                ).then(response => {
                    res.status(200).json(document);
                }).catch(err => {
                    error(err);
                });
            }
        } catch (e) {
            error(e);
        }
    },
};