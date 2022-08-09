const fileManageModel = require('../models/fileManageModel');

class fileManageController {
    static getFilesData(req, res, next) {
        fileManageModel.getFilesData(req, res, next)
    }

    static getOneData(req, res, next) {
        fileManageModel.getOneData(req, res, next);
    }

    static uploadData(req, res, next) {
        fileManageModel.uploadData(req, res, next);
    }

    static updateData(req, res, next) {
        fileManageModel.updateData(req, res, next);
    }

    static deleteData(req, res, next) {
        fileManageModel.deleteData(req, res, next);
    }
}

module.exports = fileManageController;