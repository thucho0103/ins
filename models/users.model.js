const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    nickName : String,
    password: String,
    email : String,
    dateCreate : String,
    resetToken: String,
    resetTokenExp: Date,
    plan:Date,
    isAdmin: Boolean,
})
// var list = mongoose.model('list', listSchema);
var Users = mongoose.model('Users',userSchema, 'users');

module.exports = Users;