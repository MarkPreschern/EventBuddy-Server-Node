const express = require("express");
const messageRouter = express.Router();
const messageService = require("../services/MessageService");

//read message by id
messageRouter.get("/:messageId", (req, res) => {
    messageService.getMessage(res, req.params.messageId);
});

//create message
messageRouter.post("/", (req, res) => {
    messageService.createMessage(res, req.params.organizerId, req.body);
});

//delete message by id
messageRouter.delete("/:messageId", (req, res) => {
    messageService.deleteMessage(res, req.params.organizerId, req.params.messageId);
});

//update message by id
messageRouter.put("/:messageId", (req, res) => {
    messageService.updateMessage(res, req.params.organizerId, req.params.messageId, req.body);
});

module.exports = messageRouter;