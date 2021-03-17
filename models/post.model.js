var express = require('express');

var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/demo', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('momongodb+srv://movie:admin@cluster0-wmjev.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

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