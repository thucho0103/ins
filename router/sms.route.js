var express = require('express');
var route = express.Router();

var controller = require('../controller/sms.controller');

route.get('/category',controller.getListCategory);
route.get('/:id',controller.getListSticker);

module.exports = route;