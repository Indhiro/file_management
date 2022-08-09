const express = require('express')
const router = express.Router();
const fileManageRouter = require('./fileMange.js');

router.use('/file-manage', fileManageRouter);

module.exports = router;