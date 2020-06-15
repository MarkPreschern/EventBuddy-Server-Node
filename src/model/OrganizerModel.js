const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizerSchema = new Schema(
    {
        company_name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            unique: true,
            required: true
        },
        salt: {
            type: String,
            required: true,
            select: false
        },
        hash: {
            type: String,
            required: true,
            select: false
        },
        iterations: {
            type: Number,
            required: true,
            select: false
        },
        description: {
            type: String,
            required: false
        },
        phone_number: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        company_url: {
            type: String,
            required: true
        },
        image_url: String,
        venues: [{
            type: Schema.Types.ObjectId,
            ref: "Venue"
        }],
        events: [{
            type: Schema.Types.ObjectId,
            ref: "Event"
        }]
    });

module.exports = mongoose.model("Organizer", OrganizerSchema);