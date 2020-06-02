const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Organizer = require("./OrganizerModel");
const Venue = require("./VenueModel");
const Attendee = require("./AttendeeModel");

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
        end_date: {
            type: Date,
            required: true
        },
        start_time: {
            type: Date,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        organizer: {
            type: Organizer,
            required: true
        },
        venue: {
            type: Venue,
            required: true
        },
        attendee_likes: [Attendee]
    });

module.exports = mongoose.model("EventSchema", EventSchema);