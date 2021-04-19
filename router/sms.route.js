var express = require('express');
var route = express.Router();

var controller = require('../controller/sms.controller');

route.get('/send-sms',controller.sendSMS);

module.exports = route;