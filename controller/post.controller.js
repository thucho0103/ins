const Post = require('../models/post.model');
const Users = require('../models/users.model');

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "teadragon",
    api_key: "386395173315668",
    api_secret: "f8ONL6MecGe2rHOVY4jklUqmkdw"
});

module.exports.GetAllPost = function(req, res){
    var perPage = 8;
    var page = req.query.page || 1;
    Post.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err,data){
            Post.countDocuments({}).exec(function(err,count){
                if (err) {
                    return res.status(500).json({status:500,data:err,message:"error"});
                }
                else{
                    return res.status(200).json({status:200,data:data,message:"success"});       
                }               
            })
        });  
}

module.exports.Create = function(req, res){     
    console.log(req.body); 
    Users.findOne({_id:req.user.sub})
        .then(data=>{
            const newPost = new Post({
                userId : data._id,
                content: req.body.content,
                description : req.body.description,
                list_pictures : req.body.list_pictures,
                dateUpload: new Date().getTime(),
            });
            newPost.save();  
            return res.status(200).json({status:200,data:null,message:"success"});            
        })
        .catch(err =>{            
            return res.status(500).json({status:500,data:err,message:"error"});
        });   
}

module.exports.UploadImage = function(req, res){
    cloudinary.uploader.upload(req.body.img)
    .then(result=>{
        console.log(result);
        return res.status(200).json({status:200,data:result.secure_url,message:"success"});
    }) 
    .catch(err=>{
        return res.status(500).json({status:500,data:err,message:"error"});
    });   
}
