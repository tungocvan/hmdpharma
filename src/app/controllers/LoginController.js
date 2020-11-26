class LoginController {
    // [GET] /me/stored/courses
    
    index(req, res,next) {
      //req.logout();   
      res.render('users/login',{ layout : 'layoutLogin' , login:true}) 
    } 
  }
  
module.exports = new LoginController();
  