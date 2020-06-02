const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Attendee = require("./AttendeeModel");

const MessageSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        sender: {
            type: Attendee,
            required: true
        },
        receiver: {
            type: Attendee,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now,
            immutable: true
        }
    });

module.exports = mongoose.model("MessageSchema", MessageSchema);