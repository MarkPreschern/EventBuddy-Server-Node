const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "Attendee",
            required: true
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "Attendee",
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now,
            immutable: true
        }
    });

module.exports = mongoose.model("Message", MessageSchema);