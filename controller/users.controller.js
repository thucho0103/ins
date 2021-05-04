var Users = require('../models/users.model');
var Post = require('../models/post.model');


module.exports.getCountPost = function(req, res){
    console.log(req.jwtDecoded.data._id);
    const id = req.jwtDecoded.data._id;
    Post.countDocuments({user_id:id})
        .then(count =>{
            console.log(count);
            return res.status(200).json({status:200,data:count,message:"success"});
        })
        .catch(err=>{
            return res.status(500).json({status:500,data:err,message:"error"});
        });
}

module.exports.getInformation = function(req, res){
    //console.log(req.jwtDecoded.data._id);
    const id = req.jwtDecoded.data._id;
    Users.findOne({_id:id})
        .then(result =>{
            var userInfor = result.toObject();   
            Reflect.deleteProperty(userInfor, 'password');
            Reflect.deleteProperty(userInfor, '__v'); 
            Post.countDocuments({user_id:id})
                .then(count =>{
                    userInfor.count_post = count;
                    return res.status(200).json({status:200,data:userInfor,message:"success"});
                })
                .catch(err=>{
                    return res.status(500).json({status:500,data:err,message:"error"});
                });
            // return res.status(200).json({status:200,data:userInfor,message:"success"});
        })
        .catch(err=>{
            return res.status(500).send(err);
        });
}
module.exports.postUpdateInfo = function(req,res){
    const nickName = req.body.nickName;
    const id = req.jwtDecoded.data._id;
    Users.findOne({_id:id})
        .then(user =>{
            user.nickName = nickName;
            return user.save();
        })
        .then(result =>{
            return res.status(200).send(result);
        })
        .catch(err=>{
            return res.status(500).send(err);
        })
}