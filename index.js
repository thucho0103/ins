var express = require('express');
var bodyParser =require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var passport = require('passport');

var usersRoute = require('./router/users.route');
var authRoute = require('./router/auth.route');
var postRoute = require('./router/post.route');

var port = process.env.PORT || 3000;

var app = express();

app.use(cors());

app.use(bodyParser.json({type: 'application/json'}));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(cookieParser());
// app.use(showUser.showUser);
// Route 

app.use('/users',passport.authenticate('jwt',{session : false}),usersRoute);
app.get('/',(req,res)=>{
    res.send("hello");
})

//app.use('/post',postRoute);
app.use('/post',passport.authenticate('jwt',{session : false}),postRoute);
app.use('/auth',authRoute);


app.listen(port);
console.log('server running on ' + port);