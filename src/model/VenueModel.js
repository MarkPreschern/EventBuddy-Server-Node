const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VenueSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        state: String,
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone_number: Number
    });
module.exports = mongoose.model("Venue", VenueSchema);