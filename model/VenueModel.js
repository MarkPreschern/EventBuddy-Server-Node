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
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone_number: {
            type: Number,
            required: true
        }
    });
module.exports = mongoose.model("VenueSchema", VenueSchema);