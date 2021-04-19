const mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
    userId: String,
    title:String,
    content :String,
    phone_number: String,
    list_pictures: [String],
    company_name:String,
    device_name:String,
    status:String,
    capacity:String,
    address: String,
    dateUpload: Date,
});
// var list = mongoose.model('list', listSchema);
var Comment = mongoose.model('Post',PostSchema, 'post');

module.exports = Comment;