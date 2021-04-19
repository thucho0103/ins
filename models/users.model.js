const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username : String,
    password: String,
    dateCreate : String,
    resetToken: String,
    resetTokenExp: Date,
    isAdmin: { type: Boolean, default: false },
})
// var list = mongoose.model('list', listSchema);
var Users = mongoose.model('Users',userSchema, 'users');

module.exports = Users;