
module.exports.requirePost = function(req, res, next){
    // console.log(req.body.type);
    // if(req.body.type != null){
    //     console.log(!req.body.type);
    //     return res.status(422).json({status:200,data:null,message:"type is required"})
    // }
    if(!req.body.title){
        return res.status(422).json({status:200,data:null,message:"title is required"})
    }
    if(!req.body.images){
        return res.status(422).json({status:200,data:null,message:"images is required"})
    }
    if(!req.body.price){
        return res.status(422).json({status:200,data:null,message:"price is required"})
    }
    if(!req.body.content){
        return res.status(422).json({status:200,data:null,message:"content is required"})
    }
    if(!req.body.details){
        return res.status(422).json({status:200,data:null,message:"details is required"})
    }
    if(!req.body.phone_number){
        return res.status(422).json({status:200,data:null,message:"phone_number is required"})
    } 
    if(!req.body.address){
        return res.status(422).json({status:200,data:null,message:"address is required"})
    }  
    next();
};