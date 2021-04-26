var express = require('express');
var route = express.Router();

var controller = require('../controller/auth.controller');

//var passport = require('passport');
//const passportConfig = require('../middlewares/passport.middleware');

route.get('/',controller.auth);

route.post('/login',controller.postLogin);

route.post('/register',
    controller.postRegister
);
route.post('/changepassword',controller.postChangePassword);

route.post('/checkemail',controller.CheckEmail);
route.post('/reset',controller.postReset);
route.get('/reset/:token',controller.newPassword);
route.post('/newpassword',controller.postNewPassword);

route.post('/send-email',controller.testSendEmail);

module.exports = route;
