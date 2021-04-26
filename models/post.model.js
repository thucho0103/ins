const mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
    user_id: String,
    title:String,
    images :[String],
    price : String,
    content:String,
    details:{
        brand:String,
        model:String,
        year:String,
        km_used:Number,
        status:String,
        gear:String,
        fuel:String,
        origin: String,
        designs:String,
        seat : Number,  
        capacity:String,
        color:String,   
    },
    phone_number:String,
    address: String,
    date_upload: Date,
});
// var list = mongoose.model('list', listSchema);
var Comment = mongoose.model('Post',PostSchema, 'post');

module.exports = Comment;