const mongoose = require("mongoose");

var keySchema = new mongoose.Schema({
    user_id: String,
    key : String,
},{
    versionKey: false // You should be aware of the outcome after set to false
});
// var list = mongoose.model('list', listSchema);
var Key = mongoose.model('Keys',keySchema, 'keys');

module.exports = Key;