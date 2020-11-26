const express = require('express');
const router = express.Router();
const fs = require('fs');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const loginController = require('../app/controllers/LoginController');
router.get('/', loginController.index);
router.post('/',passport.authenticate('local', {
    failureRedirect: 'users/login',  
    successRedirect: '/admin'
}));
// database mongo
// passport.use(new localStrategy(
//     (username, password, done) => { //các tên - name trường cần nhập, đủ tên trường thì Done 
        
//         const modelUser = require('../app/models/User');
//         let find = modelUser.find({email:username});       
//         find.then((user)=>{            
//             if(password === user[0].password){
//                 global.profile = user[0];
//                 return done(null, username); //trả về username
//             }else{
//                 return done(null, false); //chứng thực lỗi
//             }
//         });
      
//     }
// ))
// database file json
passport.use(new localStrategy(
    (username, password, done) => { //các tên - name trường cần nhập, đủ tên trường thì Done 
        let t = global.basedir + '/public/json/dataKhach.json';
        let modelUser = fs.readFileSync(t,{encoding:'utf8', flag:'r'}); 
        let cate = JSON.parse(modelUser);
        let user = cate.data;            
        user.find(value => {
            if(value.email == username && value.password == password){
               global.profile = value;
               return done(null, username);
            }else{
               return done(null, false); 
            }
        });
    }    
))

module.exports = router;
