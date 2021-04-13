var express = require('express');
var bodyParser =require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var cors = require('cors');
require('dotenv').config()

var passport = require('passport');

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


var usersRoute = require('./router/users.route');
var authRoute = require('./router/auth.route');
var postRoute = require('./router/post.route');
var Auth = require('./middlewares/auth.middleware');

var port = process.env.PORT || 4000;

var app = express();

app.use(cors());

app.use(bodyParser.json({type: 'application/json'}));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(cookieParser());
// app.use(showUser.showUser);
// Route 
app.get('/',(req,res)=>{
    res.send("hello");
});

app.use('/auth',authRoute);
//app.use('/post',postRoute);
app.use(Auth.isAuth);
app.use('/post',postRoute);
app.use('/users',usersRoute);



app.listen(port);
console.log('server running on ' + port);