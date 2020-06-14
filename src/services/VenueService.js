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
                            msgError: true
                        }
                    });
            } else {
                res.status(200).json(response);
            }
        });
    },

    // creates a venue
    createVenue : async (res, organizerId, venue) => {
        const newVenue = new venueModel(venue);
        const document = await newVenue.save();

        const error = () => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to add venue",
                        msgError: true
                    }
                });
        };

        if (document.ok) {
            organizerModel.update(
                { _id: organizerId},
                { $push: { venues: newVenue }}
            ).then(response => {
                res.status(200).json(document);
            }).catch(err => {
                error();
            });
        } else {
            error();
        }
    },

    // deletes a venue
    deleteVenue : async (res, organizerId, venueId) => {
        const response = await findByIdAndDelete(venueId);

        const error = () => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to delete venue",
                        msgError: true
                    }
                });
        };

        if (response.ok) {
            organizerModel.update(
                { _id: organizerId},
                { $pull: { venues: venueId }}
            ).then(response => {
                res.status(200).json(response);
            }).catch(err => {
                error();
            });
        } else {
            error();
        }
    },

    // updates a venue
    updateVenue : async (res, organizerId, venueId, venue) => {
        const document = venueModel.findOneAndUpdate(venueId, venue, {runValidators: true, new: true});

        const error = () => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to update venue",
                        msgError: true
                    }
                });
        };

        if (document.ok) {
            organizerModel.update(
                { _id: organizerId},
                { $set: { venues: venue }}
            ).then(response => {
                res.status(200).json(response);
            }).catch(err => {
                error();
            });
        } else {
            error();
        }
    },
}