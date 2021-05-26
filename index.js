const express = require('express');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config()
const PORT = process.env.PORT || 4000;

//mongoose.connect("mongodb+srv://movie:admin@movie.aoto6.gcp.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const mongoString = process.env.MONGO_DB_CONNECT;
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
mongoose.connection.on("error", function(error) {
  console.log("Có lỗi");
  console.log(error)
});

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
});

const smsRoute = require('./router/sms.route');
const usersRoute = require('./router/users.route');
const authRoute = require('./router/auth.route');
const postRoute = require('./router/post.route');
const Auth = require('./middlewares/auth.middleware');

const app = express();
const morgan = require('morgan')
app.use(express.static('images'));
app.use(morgan('combined'));
app.use(cors());

app.use(bodyParser.json({type: 'application/json'}));
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(cookieParser());

// app.use(showUser.showUser);
// Route 
app.get('/',(req,res)=>{
    res.send("hello");
});

app.use('/stickers',smsRoute);
app.use('/auth',authRoute);
//app.use('/post',postRoute);
app.use('/post',postRoute);
//app.use(Auth.isAuth);
app.use('/user',usersRoute);

app.get('*', function(req, res){
  return res.status(404).json({status:"404",message: 'Not Found.',data:"",});
});
app.post('*', function(req, res){
  return res.status(404).json({status:"404", message: 'Not Found.',data:"",});
});

// app.listen(port);
const http = require('http').Server(app);

const io = require('socket.io')(http,{
  "cors": {
      "origin": '*',
  }
});
const onConnection = (socket) => {
  require('./helpers/socket.messages')(io, socket);
}

io.on("connection", onConnection);

const server = http.listen(PORT, () => {
  console.log('server is running on port', server.address().port);
});