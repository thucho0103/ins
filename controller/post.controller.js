const Post = require('../models/post.model');
const Users = require('../models/users.model');

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

module.exports.GetAllPost = function(req, res){
    var perPage = parseInt(req.query.limit);
    var page = parseInt(req.query.page);
    Post.find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err,list_data){
            Post.countDocuments({}).exec(function(err,count){
                if (err) {
                    return res.status(500).json({status:500,data:err,message:"error"});
                }
                else{                    
                    return res.status(200).json({status:200,data:{limit:perPage,list:list_data,total_record:count},message:"success"});       
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

const cheerio = require('cheerio'),
    axios = require('axios'),
    url = `https://www.chotot.com/toan-quoc/mua-ban-do-dien-tu`;

module.exports.Crawl = function(req, res){     
    // axios.get(url)
    // .then((response) => {
    //     let $ = cheerio.load(response.data);
    //     var arr = [];
    //     //console.log($('.wrapperAdItem___2woJ1 > a > div > div > div > noscript').text());    
    //     $('.wrapperAdItem___2woJ1 > a').each(function (i, e) {   
            
    //         const imgtag = $(e).find('div > div > div > noscript').text();
    //         const img = imgtag.slice($(e).text().indexOf('src=')+5);

    //         const title = $(e).find('.adTitle___3SoJh').text();
    //         const price = $(e).find('.adPriceNormal___puYxd').text();        
    //         var post = {
    //             picture :img.slice(img,img.indexOf('"')),
    //             title :title,
    //             price :price,
    //             address :'Hồ Chí Minh',
    //             dateUpload:new Date().getTime(),
    //         }  
    //         arr.push(post);           
    //     })
    //     return arr;
    // })
    // .then(array=>{         
    //     Post.insertMany(array).then(function(){
    //         console.log("Data inserted")  // Success
    //     }).catch(function(error){
    //         console.log(error)      // Failure
    //     });
    // })
    // .catch(function (e) {
    //     console.log(e);
    // });
        Post.find({picture:"https://static.chotot.com/storage/default_images/c2c_ad_image.jpg"}).then(function(data,err){
            data.forEach(element => {
                element.picture = "https://cdn.presslabs.com/wp-content/uploads/2018/10/upload-error.png";
                element.save();
            });
            console.log(data)  // Success
        }).catch(function(error){
            console.log(error)      // Failure
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
