const Sticker = require('../models/sticker.model');


module.exports.getListCategory = function(req,res){
	const data = [
        {           
            "name": "IMG_6802.PNG",
            "link_original": "http://beta.ads.api.techres.vn:3002/public/stickers/customers/01/IMG_6802.PNG",
            "id_category": 1,
        },
        {           
            "name": "1.gif",
            "link_original": "http://beta.ads.api.techres.vn:3002/public/stickers/customers/08_Heo_Cute/1.gif",
            "id_category": 15,
        },
        {           
            "name": "1.gif",
            "link_original": "http://beta.ads.api.techres.vn:3002/public/stickers/customers/17_Minions/1.gif",
            "id_category": 18,
        },
        {           
            "name": "giphy.gif",
            "link_original": "https://media.giphy.com/media/N60wb1jkaWAEM/giphy.gif",
            "id_category": 12,
        },
    ]
    return res.status(200).json({status:200,data:data,message:"success"});
}

module.exports.getListSticker = function(req,res){
    const id = req.params.id;
    Sticker.find({id_category:id})
    .then(result=>{
        return res.status(200).json({status:200,data:result,message:"success"});
    })
    .catch(err=>{
        return res.status(500).json({status:500,data:err,message:"error"});
    })
}


