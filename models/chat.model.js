const mongoose = require("mongoose");

var chatSchema = new mongoose.Schema({
    room : String,
    message: String,
    user_first_id : String,
    user_second_id:String,
    sender:String,
    images:[String],
    createAt:{
        type: Date,
        default: Date.now
    }
},{
    versionKey: false // You should be aware of the outcome after set to false
});
// var list = mongoose.model('list', listSchema);
var Chat = mongoose.model('Chat',chatSchema, 'chat');

module.exports = Chat;