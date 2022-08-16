const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');

userRouter.post('/register', userController.registerUser);
userRouter.get('/login', userController.loginUser);
userRouter.put('/update-pass', userController.updatePassUser);

module.exports = userRouter;
