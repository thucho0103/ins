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
        production_location:String,
        km_used:Number,
        status:String,
        fuel:String,
        capacity:String,
        color:String,   
    },
    phone_number:String,
    address: String,
    date_upload: Date,
},{
    versionKey: false // You should be aware of the outcome after set to false
});
// var list = mongoose.model('list', listSchema);
var Comment = mongoose.model('Post',PostSchema, 'post');

module.exports = Comment;