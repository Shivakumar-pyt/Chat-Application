const express = require('express');
const chatRouter = express.Router();
const { getChats, getEmails, addChat, addMessage, getMessages } = require('../controllers/chatControllers');

chatRouter.post('/getChats',getChats);
chatRouter.post('/getEmails',getEmails);
chatRouter.post('/addChat',addChat);
chatRouter.post('/addMessage',addMessage);
chatRouter.post('/getMessages',getMessages);
module.exports = chatRouter;