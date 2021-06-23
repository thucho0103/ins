const Users = require('../models/users.model');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const helps = require('../helpers/jwt.helpers');

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

module.exports.auth = function (req, res) {
    res.render('auth/listUser');
}
module.exports.login = function (req, res) {
    res.render('auth/login', { errors: '0', values: '' });
}
module.exports.postLogin = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    Users.findOne({ email: email })
        .then(user => {
            if (!user) {
                //return res.render('auth/login',{errors:'Email không tồn tại', values:email});
                return res.status(403).json({ status: 403, data: {}, message: "Email không tồn tại" });
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        return helps.generateToken(user, accessTokenSecret, accessTokenLife); 
                    }
                    //return res.render('auth/login',{errors:'Mật khẩu không đúng', values:email});
                    return res.status(401).json({ status: 401, data: {}, message: "Invalid password." });
                })
                .then(accessToken =>{
                    //console.log(accessToken);                  
                    var userLogin = user.toObject();  
                    userLogin.accessToken = accessToken;      
                    Reflect.deleteProperty(userLogin, 'password');
                    Reflect.deleteProperty(userLogin, '__v');
                    //console.log(userLogin);              
                    return res.status(200).json({status: 200, data: userLogin, message: "suscess"});
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({ data: "có lỗi "+ err });
                })
        })
        .catch(err => {
            console.log(err);            
            return res.status(500).json({ data: err });
        });
}
module.exports.logout = function (req, res) {
    res.clearCookie('userId');
    //res.redirect('/');
    return res.status(200).json({ data: "suscess" });
}
module.exports.register = function (req, res) {
    res.render('auth/register', { errors: "0", values: "" });
}
module.exports.CheckEmail = function (req, res) {
    var email = req.body.email;   
    Users.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                var error = "email " + email + " đã tồn tại.";
                //res.render('auth/register', { errors : error});               
                return res.status(400).json({ status: 400, data: {}, message: error });
            }
            console.log(password);
        })       
        .then(result => {
            //res.redirect('/auth/login');
            return res.status(200).json({ data: "email có thể sử dụng" });
        })
        .catch(err => {           
            return res.status(500).json({ data: err });
        })
}

module.exports.postRegister = function (req, res) {
    const { email, first_name,last_name,phone,gender ,address,password } = req.body;
    var user = req.body;   
    Users.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                var error = "email " + email + " đã tồn tại.";
                //res.render('auth/register', { errors : error});               
                return res.status(500).json({ status: 500, data: {}, message: error });
            }
            //console.log(password);
            return bcrypt.hash(password, 12);
        })
        .then(hashPassword => {
            user.password = hashPassword;
            return Users.create(user);
        })
        .then(result => {
            //res.redirect('/auth/login');
            var user = result.toObject();
            user.accessToken = helps.generateToken(user, accessTokenSecret, accessTokenLife);
            Reflect.deleteProperty(user, 'password');
            return res.status(200).json({status: 200, data: user, message: "success" });
        })
        .catch(err => {
            return res.status(500).json({ status: 500, data: {}, message: err });
        })
}

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: 'ae0f116b4dcb88',
        pass: '5b39ef8f40b85a'
    }
});

var API_USER_ID = "a53fcd17b989efb1304363afc892e96c";
var API_SECRET = "34255bdf8f706682db05c8cd99c833fc";
var TOKEN_STORAGE = "/tmp/";
 
// sendpulse.init(API_USER_ID,API_SECRET,TOKEN_STORAGE,function() {
//     sendpulse.listAddressBooks(console.log);
// });

module.exports.postReset = function (req, res) {
    return res.status(200).json({ data: "postReset" });
}
module.exports.newPassword = function (req, res) {
    const token = req.params.token;
    Users.findOne({ resetToken: token })
        .then(user => {
            console.log(user);
            if (user) {
                //return res.render('auth/newPw',{email : user.email,token:token});
                return res.status(200).json({ data: token });
            }
            //return res.redirect('/');
            return res.status(404).json({ data: "Không tìm thấy" });
        })
        .catch(err => {
            res.status(500).json({ data: err });
            console.log(err);
        })
}
module.exports.postNewPassword = function (req, res) {
    const token = req.body.token;
    const newPassword = req.body.password;
    let resetUser;
    Users.findOne({ resetToken: token })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashPassword => {
            resetUser.password = hashPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExp = undefined;
            return resetUser.save();
        })
        .then(result => {
            //res.redirect('/auth/login');
            res.status(200).json({ data: "susscess" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ data: err });
        })
}

module.exports.postChangePassword = function (req, res) {
    const newPassword = req.body.password;
    let resetUser;
    Users.findOne({ _id: req.user.sub })
        .then(user => {
            console.log(user);
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashPassword => {
            resetUser.password = hashPassword;
            return resetUser.save();
        })
        .then(result => {
            res.status(200).json({ data: "change password susscess"});
        })
        .catch(err => {
            res.status(500).json({ data: err });
        })
}

const testTransporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 465,
    auth: {
        user: 'postmaster@sandbox0fee702a86ef4a9e981580a815256a41.mailgun.org',
        pass: '1fa4e4f3bf69430d3d2e735b7d99582d-2a9a428a-16d1c72e'
    }
});

module.exports.testSendEmail = function (req, res) {
    const email = req.body.email;
    testTransporter.sendMail({
        from:"brad@sandbox0fee702a86ef4a9e981580a815256a41.mailgun.org",
        to: email,
        subject: 'Sending with Movie+',
        html: `
        <p> Yêu cầu lấy lại mật khẩu </p>                           
    `
    })
    res.status(200).json({ data: "susscess"});
}