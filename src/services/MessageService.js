const messageModel = require("../model/MessageModel");
const conversationModel = require("../model/ConversationModel");

module.exports = {

    // gets a message
    getMessage : (res, messageId) => {
        messageModel.findOne(messageId, (err, response) => {
            if (err) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to get message",
                            msgError: true
                        }
                    });
            } else {
                res.status(200).json(response);
            }
        });
    },

    // creates a message
    createMessage : async (res, conversationId, message) => {
        const newMessage = new messageModel(message);
        const document = await newMessage.save();

        const error = () => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to add message",
                        msgError: true
                    }
                });
        };

        if (document.ok) {
            conversationModel.update(
                { _id: conversationId},
                { $push: { messages: newMessage }}
            ).then(response => {
                res.status(200).json(document);
            }).catch(err => {
                error();
            });
        } else {
            error();
        }
    },

    // deletes a message
    deleteMessage : async (res, conversationId, messageId) => {
        const response = await findByIdAndDelete(messageId);

        const error = () => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to delete message",
                        msgError: true
                    }
                });
        };

        if (response.ok) {
            conversationModel.update(
                { _id: conversationId},
                { $pull: { messages: messageId }}
            ).then(response => {
                res.status(200).json(response);
            }).catch(err => {
                error();
            });
        } else {
            error();
        }
    },

    // updates a message
    updateMessage : async (res, conversationId, messageId, message) => {
        const document = messageModel.findOneAndUpdate({_id: messageId}, message, {runValidators: true, new: true});

        const error = () => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to update message",
                        msgError: true
                    }
                });
        };

        if (document.ok) {
            conversationModel.update(
                { _id: conversationId},
                { $set: { messages: message }}
            ).then(response => {
                res.status(200).json(response);
            }).catch(err => {
                error();
            });
        } else {
            error();
        }
    },
};