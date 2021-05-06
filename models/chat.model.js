const mongoose = require("mongoose");

var chatSchema = new mongoose.Schema({
    room : String,
    messages: String,
    userId:String,
    images:[String]
},{
    versionKey: false // You should be aware of the outcome after set to false
});
// var list = mongoose.model('list', listSchema);
var Chat = mongoose.model('Chat',chatSchema, 'chat');

module.exports = Chat;