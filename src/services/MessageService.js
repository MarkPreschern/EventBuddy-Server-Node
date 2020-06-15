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
                            msgError: true,
                            error: err
                        }
                    });
            } else {
                res.status(200).json(response);
            }
        });
    },

    // creates a message
    createMessage : async (res, conversationId, message) => {
        const error = (err) => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to add message",
                        msgError: true,
                        error: err
                    }
                });
        };

        try {
            const newMessage = new messageModel(message);
            const document = await newMessage.save();

            conversationModel.update(
                { _id: conversationId},
                { $push: { messages: newMessage }}
            ).then(response => {
                res.status(200).json(document);
            }).catch(err => {
                error(err);
            });
        } catch (e) {
            error(e);
        }
    },

    // deletes a message
    deleteMessage : async (res, conversationId, messageId) => {
        const error = (err) => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to delete message",
                        msgError: true,
                        error: err
                    }
                });
        };

        try {
            const response = await findByIdAndDelete(messageId);

            conversationModel.update(
                { _id: conversationId},
                { $pull: { messages: messageId }}
            ).then(response => {
                res.status(200).json(response);
            }).catch(err => {
                error(err);
            });
        } catch (e) {
            error(e);
        }
    },

    // updates a message
    updateMessage : async (res, conversationId, messageId, message) => {
        const error = (err) => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to update message",
                        msgError: true,
                        error: err
                    }
                });
        };

        try {
            const document = await messageModel.findOneAndUpdate({_id: messageId}, message, {runValidators: true, new: true});

            conversationModel.update(
                { _id: conversationId},
                { $set: { messages: message }}
            ).then(response => {
                res.status(200).json(document);
            }).catch(err => {
                error(err);
            });
        } catch (e) {
            error(e);
        }
    },
};