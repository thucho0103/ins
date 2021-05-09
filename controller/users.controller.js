var Users = require("../models/users.model");
var Post = require("../models/post.model");
var Room = require("../models/room.model");
const Chat = require('../models/chat.model');

module.exports.getCountPost = function (req, res) {
  console.log(req.jwtDecoded.data._id);
  const id = req.jwtDecoded.data._id;
  Post.countDocuments({ user_id: id })
    .then((count) => {
      console.log(count);
      return res
        .status(200)
        .json({ status: 200, data: count, message: "success" });
    })
    .catch((err) => {
      return res.status(500).json({ status: 500, data: err, message: "error" });
    });
};

module.exports.getInformation = function (req, res) {
  //console.log(req.jwtDecoded.data._id);
  const id = req.query._id;
  Users.findOne({ _id: id })
    .then((result) => {
      //console.log(result);
      var userInfor = result.toObject();
      Reflect.deleteProperty(userInfor, "password");
      Reflect.deleteProperty(userInfor, "__v");
      Post.countDocuments({ user_id: id })
        .then((count) => {
          userInfor.count_post = count;
          return res
            .status(200)
            .json({ status: 200, data: userInfor, message: "success" });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ status: 500, data: err, message: "error" });
        });
      // return res.status(200).json({status:200,data:userInfor,message:"success"});
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};
module.exports.postUpdateInfo = function (req, res) {
  const nickName = req.body.nickName;
  const id = req.jwtDecoded.data._id;
  Users.findOne({ _id: id })
    .then((user) => {
      user.nickName = nickName;
      return user.save();
    })
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

module.exports.GetAllPost = function (req, res) {
  var perPage = parseInt(req.query.limit) || 10;
  var page = parseInt(req.query.page) || 1;
  const id = req.query._id || -1;
  console.log(id);
  Post.find({ user_id: id })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function (err, list_data) {
      Post.countDocuments({ user_id: id }).exec(function (err, count) {
        if (err) {
          return res
            .status(500)
            .json({ status: 500, data: err, message: "error" });
        } else {
          return res
            .status(200)
            .json({
              status: 200,
              data: { limit: perPage, list: list_data, total_record: count },
              message: "success",
            });
        }
      });
    });
};

module.exports.getListRoom = function (req, res) {
  const id = req.body._id;
  const name = req.body.name;
  Room.find({
    $or: [
      {
        user_first_id: id,
      },
      {
        user_second_id: id,
      },
    ],
  })
    .then((result) => {
      result.forEach(element=>{
        element.room_name = element.room_name.replace(name,'');
      })
      return res
        .status(200)
        .json({ status: 200, data: result, message: "success" });
    })
    .catch((err) => {
      return res.status(500).json({ status: 500, data: err, message: "error" });
    });
};

module.exports.getRoom = function (req, res) {
  Room.findOne({
    $or: [
      {
        room_check: req.body.user_first_id + req.body.user_second_id,
      },
      {
        room_check: req.body.user_second_id + req.body.user_first_id,
      },
    ],
  })
    .then((result) => {
      if (result) {
        // console.log(result);
        return res
          .status(200)
          .json({ status: 200, data: result, message: "success" });
      } else {
        const newRoom = {
          user_first_id: req.body.user_first_id,
          user_second_id: req.body.user_second_id,
          room_check: req.body.user_first_id + req.body.user_second_id,
          room_name : req.body.user_first_name + req.body.user_second_name,
        };
        Room.create(newRoom, function (err, data) {
          return res
            .status(200)
            .json({ status: 200, data: data, message: "success" });
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ status: 500, data: err, message: "error" });
    });
};

module.exports.getListMessages = function (req, res) {
  var perPage = parseInt(req.query.limit) || 10;
    var page = parseInt(req.query.page) || 1;
  const id = req.query.room_id;
  Chat.find({room:id})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err,list_data){
          Post.countDocuments({room:id}).exec(function(err,count){
              if (err) {
                  return res.status(500).json({status:500,data:err,message:"error"});
              }
              else{             
                  return res.status(200).json({status:200,data:{limit:perPage,list:list_data,total_record:count},message:"success"});       
              }               
          })
      });
};
