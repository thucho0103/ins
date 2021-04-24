const mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
    userId: String,
    title:String,
    picture :String,
    price : String,
    address: String,
    dateUpload: Date,
});
// var list = mongoose.model('list', listSchema);
var Comment = mongoose.model('Post',PostSchema, 'post');

module.exports = Comment;