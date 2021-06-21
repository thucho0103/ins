var express = require('express');
var route = express.Router();

var controller = require('../controller/users.controller');
var Auth = require('../middlewares/auth.middleware');

route.get('/information',controller.getInformation);
route.get('/get-count-post',Auth.isAuth,controller.getCountPost);
route.post('/updateinfor',Auth.isAuth,controller.postUpdateInfo);
route.get('/all-post',controller.GetAllPost);
// route.post('/create-room',controller.createRoom);
route.post('/get-room',controller.getRoom);
route.post('/get-list-room',controller.getListRoom);
route.get('/get-list-messages',controller.getListMessages);
route.post('/update-avatar',Auth.isAuth,controller.updateAvatar);
route.post('/post-key',Auth.isAuth,controller.addKey);
route.get('/get-key',Auth.isAuth,controller.getKey);

module.exports = route;
