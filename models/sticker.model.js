const mongoose = require("mongoose");

var stickerSchema = new mongoose.Schema({
    name : String,
    link_original : String,
    id_category:String
},{
    versionKey: false // You should be aware of the outcome after set to false
});
// var list = mongoose.model('list', listSchema);
var Sticker = mongoose.model('Sticker',stickerSchema, 'sticker');

module.exports = Sticker;