const mongoose = require("mongoose");

var roomSchema = new mongoose.Schema({
    user_first_id : String,
    user_second_id : String,
    room_avatar : String,
    room_check: String,
    room_name: String,
},{
    versionKey: false // You should be aware of the outcome after set to false
});
// var list = mongoose.model('list', listSchema);
var Room = mongoose.model('Room',roomSchema, 'room');

module.exports = Room;