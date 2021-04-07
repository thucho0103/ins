var express = require('express');
var route = express.Router();

var controller = require('../controller/auth.controller');

var passport = require('passport');
const passportConfig = require('../middlewares/passport.middleware');

route.get('/',controller.auth);
route.get('/login',controller.login);
route.post('/login',controller.postLogin);
route.get('/logout',controller.logout);

route.get('/register',controller.register);
route.post('/register',
    controller.postRegister
);
route.post('/changepassword',passport.authenticate('jwt',{session : false}),controller.postChangePassword);

route.post('/checkemail',controller.CheckEmail);
route.get('/reset',controller.Reset);
route.post('/reset',controller.postReset);
route.get('/reset/:token',controller.newPassword);
route.post('/newpassword',controller.postNewPassword);

route.post('/send-email',controller.testSendEmail);

module.exports = route;
