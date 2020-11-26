const modelUser = require('../models/User');
const {mutileMongooseToObject , mongooseToObject} = require('./mongoose');
class UserController {
  // [GET] /
  index(req, res,next) {
    Promise.all([modelUser.find({})]).then(
        ([users])=>{
           res.json(users);
    }).catch(next) 
  } 
  register(req, res) {
    res.render('users/register',{ usersPage : true })    
  }
  login(req, res) {
    res.render('users/login',{ usersPage : true })    
  }
  check(req, res,next) {
       let username = req.body.username;
       let password = req.body.password;
       let find = modelUser.find({email:username});
       find.then((user)=>{
            //res.json(user);
            if(password === user[0].password){
                res.render('home',{ homePage : true });
            }else{
                res.render('users/login',{ usersPage : true }) 
            }
       });
    
  }
  store(req, res) {
    //    res.json(req.body);
    const Obj = new modelUser(req.body);
    Obj.save().then(() =>  res.render('users/login',{ usersPage : true }) );
  }

}

module.exports = new UserController();
