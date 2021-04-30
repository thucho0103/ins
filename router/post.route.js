var express = require('express');
var route = express.Router();

var controller = require('../controller/post.controller');
var Auth = require('../middlewares/auth.middleware');
var Validator = require('../middlewares/post.middleware');

route.get('/get-all',controller.GetAllPost);
route.get('/get-by-type',controller.GetByType);
route.post('/create',Auth.isAuth,Validator.requirePost,controller.Create);
route.post('/upload-image',controller.UploadImage);
route.get('/get-image',controller.GetImage);

route.get('/crawl',controller.Crawl);

module.exports = route;