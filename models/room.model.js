const mongoose = require("mongoose");

var roomSchema = new mongoose.Schema({
    userFirstId : String,
    userSecondId : String,
},{
    versionKey: false // You should be aware of the outcome after set to false
});
// var list = mongoose.model('list', listSchema);
var Room = mongoose.model('Room',roomSchema, 'room');

module.exports = Room;