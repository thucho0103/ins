const mongoose = require("mongoose");
//mongoose.connect("mongodb+srv://movie:admin@movie.aoto6.gcp.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const mongoString = "mongodb+srv://movie:admin@movie.aoto6.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("error", function(error) {
    console.log("Có lỗi");
  console.log(error)
});

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
});


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