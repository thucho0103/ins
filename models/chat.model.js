const mongoose = require("mongoose");

var chatSchema = new mongoose.Schema({
    userFirstId : String,
    userSecondId : String,
    room : String,
    messages: String,
},{
    versionKey: false // You should be aware of the outcome after set to false
});
// var list = mongoose.model('list', listSchema);
var Chat = mongoose.model('Chat',chatSchema, 'chat');

module.exports = Chat;