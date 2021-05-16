const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    email: String,
    first_name : String,
    last_name : String,
    avatar : String,
    phone : String,
    gender : Number,
    address : String,
    password: String,
    dateCreate : String,
    resetToken: String,
    resetTokenExp: Date
},{
    versionKey: false // You should be aware of the outcome after set to false
});
// var list = mongoose.model('list', listSchema);
var Users = mongoose.model('Users',userSchema, 'users');

module.exports = Users;