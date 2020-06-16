const express = require("express");
const conversationRouter = express.Router({mergeParams: true});
const conversationService = require("../services/ConversationService");

//read conversation by id
conversationRouter.get("/:conversationId", (req, res) => {
    conversationService.getConversation(res, req.params.conversationId);
});

//create conversation
conversationRouter.post("/", (req, res) => {
    conversationService.createConversation(res, req.params.attendeeId, req.body);
});

//delete conversation by id
conversationRouter.delete("/:conversationId", (req, res) => {
    conversationService.deleteConversation(res, req.params.attendeeId, req.params.conversationId, req.body);
});

//update conversation by id
conversationRouter.put("/:conversationId", (req, res) => {
    conversationService.updateConversation(res, req.params.attendeeId, req.params.conversationId, req.body);
});

module.exports = conversationRouter;