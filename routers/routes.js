const express = require('express')
const router = express.Router();
const userRouter = require('./userRouter');
const fileManageRouter = require('./fileMange.js');

router.use('/user', userRouter);
router.use('/file-manage', fileManageRouter);

module.exports = router;