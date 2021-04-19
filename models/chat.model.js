const mongoose = require("mongoose");

var chatSchema = new mongoose.Schema({
    room : String,
    messages: String,
})
// var list = mongoose.model('list', listSchema);
var Chat = mongoose.model('Chat',chatSchema, 'chat');

module.exports = Chat;