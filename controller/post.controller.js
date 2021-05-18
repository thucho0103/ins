const Post = require('../models/post.model');
const Users = require('../models/users.model');
const Sticker = require('../models/sticker.model');
const Chat = require('../models/chat.model');

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

module.exports.GetAllPost = function(req, res){
    var perPage = parseInt(req.query.limit) || 10;
    var page = parseInt(req.query.page) || 1;
    const type = req.query.type || -1; 
    var typeFilter = {};
    if (type != -1){
        typeFilter = {'type':type}
    }
    console.log(type);
    Post.find(typeFilter)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err,list_data){
            Post.countDocuments(typeFilter).exec(function(err,count){
                if (err) {
                    return res.status(500).json({status:500,data:err,message:"error"});
                }
                else{             
                    return res.status(200).json({status:200,data:{limit:perPage,list:list_data,total_record:count},message:"success"});       
                }               
            })
        });  
}

module.exports.SearchPost = function(req, res){
    var perPage = parseInt(req.query.limit) || 10;
    var page = parseInt(req.query.page) || 1;
    const key = req.query.key || ''; 
    Post.find({
        $or: [
          {
            title: { $regex: key },
          },
          {
            content: { $regex: key },
          },
        ],
      })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err,list_data){
            Post.countDocuments().exec(function(err,count){
                if (err) {
                    return res.status(500).json({status:500,data:err,message:"error"});
                }
                else{             
                    return res.status(200).json({status:200,data:{limit:perPage,list:list_data,total_record:count},message:"success"});       
                }               
            })
        });  
}

module.exports.confirmBought = function(req, res){
    Post.findById(req.body._id)
        .then(result=>{
            result.statusbought = 1;
            result.save();
            //console.log(result);
            return res.status(200).json({status:200,data:result,message:"success"});
        })
        .catch(err=>{
            return res.status(500).json({status:500,data:err,message:"error"});
        })
}

module.exports.Create = function(req, res){     
    //console.log(req.body); 
    console.log(req.jwtDecoded.data._id);
    Users.findOne({_id:req.jwtDecoded.data._id})
        .then(data=>{
            console.log(data);
            const newPost = req.body;
            var addPost = {user_id:data._id,first_name:data.first_name,last_name:data.last_name, date_upload:Date.now()};
            const returnedTarget = Object.assign(newPost, addPost);
            //console.log(returnedTarget);
            Post.create(returnedTarget)
            .then(result=>{
                return res.status(200).json({status:200,data:result,message:"success"});      
            })
            .catch(err=>{
                return res.status(500).json({status:500,data:err,message:"error"});
            });          
        })
        .catch(err =>{            
            return res.status(500).json({status:500,data:err,message:"error"});
        });   
}

const cheerio = require('cheerio'),
    axios = require('axios'),
    url = `https://www.chotot.com/toan-quoc/mua-ban-do-dien-tu`;

module.exports.Crawl = function(req, res){
    // const list = req.body.data;
    // console.log(req.body.data);
    // // list.forEach(element=>{
    // //     element.link_original = 'http://beta.ads.api.techres.vn:3002'+ element.link_original;
    // //   })
    // Sticker.insertMany(req.body.data);
    // res.send(200);
    Users.find()
    .then(data=>{
        data.forEach(element => {
            element.avatar = 'http://173.254.232.92:4000/1621325914554boy.png';
            element.save();
        });
        res.send(200);
    })
    .catch(err=>{
        console.log(err);
    })
}

// module.exports.UploadImage = function(req, res){   
//     cloudinary.uploader.upload(req.body.img)
//     .then(result=>{
//         console.log(result);
//         return res.status(200).json({status:200,data:result.secure_url,message:"success"});
//     }) 
//     .catch(err=>{
//         return res.status(500).json({status:500,data:err,message:"error"});
//     });   
// }

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now().toString().concat(file.originalname));
    }
  });
const upload = multer({ storage: storage }).single('send_file');

module.exports.UploadImage = function(req, res){  
    //console.log(req); 
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
            console.log(err);
          return res.status(500).json({status:500,data:err,message:"error"});
        } else if (err) {
            console.log(err);
          // An unknown error occurred when uploading.
          return res.status(500).json({status:500,data:err,message:"error"});
        }
        //console.log(req.file); 
        return res.status(200).json({status:200,data:req.file.filename,message:"success"});
      })
}
const fs = require('fs');

module.exports.GetImage = function(req, res){  
    let directory_name = "images";
    let filenames = fs.readdirSync(directory_name);
    //console.log("\nFilenames in directory:");
    const file_name = filenames.find(element=>element.includes(req.query.file_name));
    if(file_name){
        return res.status(200).json({status:200,data:file_name,message:"success"});
    }
    else{
        return res.status(500).json({status:500,data:"not found",message:"error"});
    }    
}