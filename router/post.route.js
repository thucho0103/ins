var express = require('express');
var route = express.Router();

var controller = require('../controller/post.controller');

route.post('/create',controller.Create);
route.post('/upload-image',controller.UploadImage);
route.get('/get-all',controller.GetAllPost);

route.get('/crawl',controller.Crawl);

module.exports = route;