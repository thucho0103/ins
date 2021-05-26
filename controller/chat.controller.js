var Chat = require('../models/chat.model');

module.exports.getAllMessage = function(req, res){
    //const id = req.jwtDecoded.data._id;
    Chat.findOne({room:req.body.room})
        .sort({'createAt':-1})
        .then(result =>{          
            return res.status(200).send(result);
        })
        .catch(err=>{
            return res.status(500).send(err);
        });
}
module.exports.getAllRoom = function(req, res){
    //const id = req.jwtDecoded.data._id;
    Chat.findOne({room:req.body.room})
        .then(result =>{          
            return res.status(200).send(result);
        })
        .catch(err=>{
            return res.status(500).send(err);
        });
}