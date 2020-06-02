const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizerSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone_number: {
            type: String,
            required: true
        },
        email: {
            type: String,
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
        company_name: {
            type: String,
            required: true
        },
        company_url: {
            type: String,
            required: true
        }
    });

module.exports = mongoose.model("OrganizerSchema", OrganizerSchema);