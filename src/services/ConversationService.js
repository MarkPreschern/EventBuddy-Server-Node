const conversationModel = require("../model/ConversationModel");
const attendeeModel = require("../model/AttendeeModel");

module.exports = {

    // gets a conversation
    getConversation : (res, conversationId) => {
        conversationModel.findOne(conversationId, (err, response) => {
            if (err) {
                res.status(500).json(
                    {
                        message: {
                            msgBody: "Unable to get conversation",
                            msgError: true,
                            error: err
                        }
                    });
            } else {
                res.status(200).json(response);
            }
        });
    },

    // creates a conversation
    createConversation : async (res, attendeeId, conversation) => {
        const newConversation = new conversationModel(conversation);
        const document = await newConversation.save();

        const error = (err) => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to add conversation",
                        msgError: true,
                        error: err
                    }
                });
        };

        if (document.ok) {
            attendeeModel.update(
                { _id: attendeeId},
                { $push: { conversations: newConversation }}
            ).then(response => {
                res.status(200).json(document);
            }).catch(err => {
                error(err);
            });
        } else {
            error("");
        }
    },

    // deletes a conversation
    deleteConversation : async (res, attendeeId, conversationId) => {
        const response = await findByIdAndDelete(conversationId);

        const error = (err) => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to delete conversation",
                        msgError: true,
                        error: err
                    }
                });
        };

        if (response.ok) {
            attendeeModel.update(
                { _id: attendeeId},
                { $pull: { conversations: conversationId }}
            ).then(response => {
                res.status(200).json(response);
            }).catch(err => {
                error(err);
            });
        } else {
            error("");
        }
    },

    // updates a conversation
    updateConversation : async (res, attendeeId, conversationId, conversation) => {
        const document = conversationModel.findOneAndUpdate({_id: conversationId}, conversation, {runValidators: true, new: true});

        const error = (err) => {
            res.status(500).json(
                {
                    message: {
                        msgBody: "Unable to update conversation",
                        msgError: true,
                        error: err
                    }
                });
        };

        if (document.ok) {
            attendeeModel.update(
                { _id: attendeeId},
                { $set: { conversations: conversation }}
            ).then(response => {
                res.status(200).json(response);
            }).catch(err => {
                error(err);
            });
        } else {
            error("");
        }
    },
};