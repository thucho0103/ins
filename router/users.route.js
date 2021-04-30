var express = require('express');
var route = express.Router();

var controller = require('../controller/users.controller');
var Auth = require('../middlewares/auth.middleware');

route.get('/information',Auth.isAuth,controller.index);
route.get('/get-count-post',Auth.isAuth,controller.getCountPost);
route.post('/updateinfor',Auth.isAuth,controller.postUpdateInfo);

module.exports = route;
