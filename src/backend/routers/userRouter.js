const express = require('express');
const userRouter = express.Router();
const { checkCredentials } = require('../controllers/userController');

userRouter.post('/checkCredentials',checkCredentials);
module.exports = userRouter;

