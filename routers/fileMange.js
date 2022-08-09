const express = require('express');
const fileManageRouter = express.Router();
const fileManageController = require('../controller/fileManageController');

fileManageRouter.get('/get-files', fileManageController.getFilesData);
fileManageRouter.get('/get-file', fileManageController.getOneData);
fileManageRouter.post('/upload-file', fileManageController.uploadData);
fileManageRouter.put('/update-file', fileManageController.updateData);
fileManageRouter.delete('/delete-file', fileManageController.deleteData);

module.exports = fileManageRouter;