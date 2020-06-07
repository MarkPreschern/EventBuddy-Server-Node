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
            required: true
        },
        hash: {
            type: String,
            required: true
        },
        iterations: {
            type: Number,
            required: true
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
        address: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            data: Buffer
        },
        company_url: {
            type: String,
            required: true
        },
        venues: [{
            type: Schema.Types.ObjectId,
            ref: "Venue"
        }]
    });

module.exports = mongoose.model("Organizer", OrganizerSchema);