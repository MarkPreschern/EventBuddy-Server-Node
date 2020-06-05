const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        info: String,
        accessibility: String,
        ticketLimit: String,
        pleaseNote: String,
        start_date: {
            type: Date,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        external: {
            type: Boolean,
            default: false
        },
        venue: {
            type: Schema.Types.ObjectId,
            ref: "Venue"
        },
        organizer: {
            type: Schema.Types.ObjectId,
            ref: "Organizer"
        },
        attendee_likes: [{
            type: Schema.Types.ObjectId,
            ref: "Attendee"
        }]
    });

module.exports = mongoose.model("Event", EventSchema);