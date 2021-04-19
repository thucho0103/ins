const Post = require('../models/post.model');
const Users = require('../models/users.model');

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
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
    console.log(req.jwtDecoded.data._id);
    Users.findOne({_id:req.jwtDecoded.data._id})
        .then(data=>{
            const newPost = new Post({
                userId : data._id,
                title : req.body.title,
                content: req.body.content,
                phone_number : req.body.phone_number,
                list_pictures : req.body.list_pictures,
                company_name : req.body.company_name,
                device_name : req.body.device_name,
                status : req.body.status,
                capacity : req.body.capacity,
                address : req.body.address,
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
