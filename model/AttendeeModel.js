const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Conversation = require("./ConversationModel");
const Event = require("./EventModel");

const AttendeeSchema = new Schema(
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
        dob: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        conversations: [Conversation],
        events_liked: [Event],
    });

module.exports = mongoose.model("AttendeeSchema", AttendeeSchema);