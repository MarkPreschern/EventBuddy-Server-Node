const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Attendee = require("./AttendeeModel");
const Message = require("./MessageModel");

const ConversationSchema = new Schema(
    {
        sender: {
            type: Attendee,
            required: true
        },
        receiver: {
            type: Attendee,
            required: true
        },
        messages: [Message]
    });

module.exports = mongoose.model("ConversationSchema", ConversationSchema);