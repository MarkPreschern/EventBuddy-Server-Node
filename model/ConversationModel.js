const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
    {
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
        messages: [{
            type: Schema.Types.ObjectId,
            ref: "Message"
        }]
    });

module.exports = mongoose.model("Conversation", ConversationSchema);