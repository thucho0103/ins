var express = require('express');
var route = express.Router();

var controller = require('../controller/post.controller');
var Auth = require('../middlewares/auth.middleware');

route.get('/get-all',controller.GetAllPost);
route.post('/create',Auth.isAuth,controller.Create);
route.post('/upload-image',Auth.isAuth,controller.UploadImage);

route.get('/crawl',controller.Crawl);

module.exports = route;