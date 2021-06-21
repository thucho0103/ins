const Users = require("../models/users.model");
const Post = require("../models/post.model");
const Room = require("../models/room.model");
const Chat = require("../models/chat.model");
const { modelName } = require("../models/post.model");
const Key = require('../models/key.model');

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
          return res.status(200).json({
            status: 200,
            data: { limit: perPage, list: list_data, total_record: count },
            message: "success",
          });
        }
      });
    });
};

// module.exports.getListRoom = function (req, res) {
//   const id = req.body._id;
//   const name = req.body.name;
//   Room.find({
//     $or: [
//       {
//         user_first_id: id,
//       },
//       {
//         user_second_id: id,
//       },
//     ],
//   })
//     .then(result => {
//       result.forEach((element) => {
//         if (element.user_first_id != id) {
//           let temp = element.user_first_id;
//           element.user_first_id = element.user_second_id;
//           element.user_second_id = temp;
//         }
//         element.room_name = element.room_name.replace(name, "");
//       });
//       return result;
//     })
//     .then(data => {
//       data.forEach(element => {
//         Users.findById(id)
//         .then(data =>{
//           element.room_name = data.avatar;
//           // return element;
//         })
//         .catch(err=>{
//           console.log(err);
//         })
//       });

//       console.log(element);

//       return res;
//     })
//     .then(res=>{
//       return res
//       .status(200)
//       .json({ status: 200, data: res, message: "success" });
//     })
//     .catch((err) => {
//       return res.status(500).json({ status: 500, data: err, message: "error" });
//     });
// };

module.exports.getListRoom = async(req,res)=>{
  try {
  const id = req.body._id;
  const name = req.body.name;
  const data = await Room.find({
    $or: [
      {
        user_first_id: id,
      },
      {
        user_second_id: id,
      },
    ],
  }).exec();

  for (const element of data) {
    if (element.user_first_id != id) {
      let temp = element.user_first_id;
      element.user_first_id = element.user_second_id;
      element.user_second_id = temp;
    }
    element.room_name = element.room_name.replace(name, "");

    const img = await Users.findById(element.user_second_id).exec();
    element.room_avatar = await img.avatar;
  }
  return res
      .status(200)
      .json({ status: 200, data: data, message: "success" });
  } catch (error) {
    return res.status(500).json({ status: 500, data: error, message: "error" });
  }
}


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
          room_name: req.body.user_first_name + req.body.user_second_name,
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
  let perPage = parseInt(req.query.limit) || 10;
  let page = parseInt(req.query.page) || 1;
  const id = req.query.room_id;
  Chat.find({ room: id })
    .sort({'createAt':'descending'})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function (err, list_data) {
      Chat.countDocuments({ room: id }).exec(function (err, count) {
        if (err) {
          return res
            .status(500)
            .json({ status: 500, data: err, message: "error" });
        } else {
          return res
            .status(200)
            .json({
              status: 200,
              data: { limit: perPage, list: list_data.reverse(), total_record: count },
              message: "success",
            });
        }
      });
    });
};

module.exports.updateAvatar = function (req, res) {
  const avatar = req.body.avatar_image;
  console.log(req.jwtDecoded.data._id);
  const id = req.jwtDecoded.data._id;
  Users.findById(id)
  .then(result => {
    result.avatar = avatar;
    result.save();
    return result;
  })
  .then(data=>{
    return res
      .status(200)
      .json({ status: 200, data: data, message: "success" });
  })
  .catch((err) => {
    return res.status(500).json({ status: 500, data: err, message: "error" });
  });
};

module.exports.addKey = function (req, res) {

  const id = req.jwtDecoded.data._id;
  const key = {
    user_id:id,
    key:req.body.key,
  }

  Key.create(key)
  .then(result=>{
    return res
    .status(200)
    .json({ status: 200, data: result, message: "success" });
  })
  .catch((err) => {
    return res.status(500).json({ status: 500, data: err, message: "error" });
  });

};

module.exports.getKey = function (req, res) {

  const id = req.jwtDecoded.data._id;

  Key.find({user_id:id})
  .then(result=>{
    return res
    .status(200)
    .json({ status: 200, data: result, message: "success" });
  })
  .catch((err) => {
    return res.status(500).json({ status: 500, data: err, message: "error" });
  });
  
};
