const mongoose = require("mongoose");
// const mongoString = "mongodb+srv://movie:admin@movie.aoto6.gcp.mongodb.net/test?retryWrites=true&w=majority";

// mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true});

// mongoose.connection.on("error", function(error) {
//     console.log("Có lỗi");
//   console.log(error)
// });

// mongoose.connection.on("open", function() {
//   console.log("Connected to MongoDB database.")
// });

var PostSchema = new mongoose.Schema({
    userId: String,
    content :String,
    description: String,
    list_pictures: [String],
    dateUpload: Date,
});
// var list = mongoose.model('list', listSchema);
var Comment = mongoose.model('Post',PostSchema, 'post');

module.exports = Comment;