const mongoose = require("mongoose");
const { getDateString } = require('../helpers/formatDate.helpers');

var PostSchema = new mongoose.Schema({
    user_id: String,
    first_name: String,
    last_name: String,
    type : Number,
    title:String,
    images :[String],
    price : Number,
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
        status:{
            type:Number,
            default: 0
        }
    },
    phone_number:String,
    address: String,
    date_upload: Date,
    dateUpload:{
        type: String,
        default: function() {  
            return getDateString(this.date_upload);
        }
    }
},{
    versionKey: false // You should be aware of the outcome after set to false
});
// var list = mongoose.model('list', listSchema);
var Comment = mongoose.model('Post',PostSchema, 'post');

module.exports = Comment;