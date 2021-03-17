var express = require('express');
var route = express.Router();

var controller = require('../controller/post.controller');

route.post('/create',controller.Create);
route.post('/upload-image',controller.UploadImage);
route.get('/get-all',controller.GetAllPost);
//route.get('/changemovie',controller.ChangeData);


module.exports = route;