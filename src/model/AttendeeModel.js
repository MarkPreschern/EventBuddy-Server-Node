const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendeeSchema = new Schema(
    {
        name: {
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
        phone_number: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        conversations: [{
            type: Schema.Types.ObjectId,
            ref: "Conversation"
        }],
        events_liked: [{
            type: Schema.Types.ObjectId,
            ref: "Event"
        }],
    });

module.exports = mongoose.model("Attendee", AttendeeSchema);