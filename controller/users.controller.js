var Users = require('../models/users.model');

module.exports.index = function(req, res){
    //console.log(req.jwtDecoded.data._id);
    const id = req.jwtDecoded.data._id;
    Users.findOne({_id:id})
        .then(result =>{
            var today = result.plan;
            var dd = today.getDate();
            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            if(dd<10) 
            {
                 dd='0'+dd;
            } 
            if(mm<10) 
            {
                mm='0'+mm;
            }
            var user = {
                email:result.email,
                nickname:result.nickName,
                plan: dd+'/'+mm+'/'+yyyy,
                dateCreate:result.dateCreate
            }
            return res.status(200).send(user);
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