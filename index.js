var express = require('express');
var bodyParser =require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var cors = require('cors')

var usersRoute = require('./router/users.route');
var authRoute = require('./router/auth.route');
var adminRoute = require('./router/admin.route');
var paymentRoute = require('./router/payment.route');

var postRoute = require('./router/post.route');

var controller = require('./controller/admin.controller');

var authMiddleware = require('./middlewares/admin.middlerware');
var passport = require('passport');
const passportConfig = require('./middlewares/passport.middleware');

var port = process.env.PORT || 3000;

var app = express();

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('./public'));
app.use(cors());

app.use(bodyParser.json({type: 'application/json'}));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(cookieParser());
// app.use(showUser.showUser);
// Route 

app.use('/users',passport.authenticate('jwt',{session : false}),usersRoute);

//app.use('/post',postRoute);
app.use('/post',passport.authenticate('jwt',{session : false}),postRoute);
app.use('/auth',authRoute);
app.use('/admin',adminRoute);
app.use('/payment',passport.authenticate('jwt',{session : false}),paymentRoute);


app.listen(port);
console.log('server running on ' + port);