const userModel = require('../models/userModel');

class userController {
    static registerUser(req, res, next) {
        userModel.registerUser(req, res, next);
    };

    static loginUser(req, res, next) {
        userModel.loginUser(req, res, next);
    };

    static updatePassUser(req, res, next) {
        userModel.updatePassUser(req, res, next);
    };
}

module.exports = userController;