const cartRouter = require('./cart');
const siteRouter = require('./site');
const usersRouter = require('./users');
const loginRouter = require('./login');
const adminRouter = require('./admin');
const checkoutRouter = require('./checkout');
const contactRouter = require('./contact');
const loginRegisterRouter = require('./loginRegister');
const productDetailsRouter = require('./productDetails');
const postDetailsRouter = require('./postDetails');
const wishlistRouter = require('./wishlist');
const accountRouter = require('./account');

function route(app) {
  app.use('/admin', adminRouter);
  app.use('/register',showMenu, loginRegisterRouter);
  app.use('/users',ensureAuthenticated, usersRouter);
  app.use('/login', loginRouter); 
  app.use('/logout', logout);
  app.use('/cart',showMenu, cartRouter);
  app.use('/contact',showMenu, contactRouter);
  app.use('/checkout',showMenu, checkoutRouter);  
  app.use('/productDetails',showMenu, productDetailsRouter);
  app.use('/postDetails',showMenu, postDetailsRouter);
  app.use('/wishlist',showMenu, wishlistRouter);
  app.use('/account',showMenu, accountRouter);
  app.use('/',showMenu, siteRouter);
}

function ensureAuthenticated(req, res, next) {
  
  // truyền biến qua router
  
    if (req.isAuthenticated()) { 
        //res.locals.menu = showMenu();
        res.locals.profile = global.profile;        
        return next();    
     
    }else{
      res.redirect('/login')
    }
    
  
  //res.locals.menu = global.menu;
}

function logout(req, res){
  req.logout();
  res.redirect('/');
}

function showMenu(req, res, next){
  const fs = require('fs'); 
  let t =  global.basedir +  '/public/azshopweb/menu/menuTop.json';
  fs.readFile(t, function read(err, data) {
     if (err)   throw err;
     var items = JSON.parse(data); 
     res.locals.menu =  items.menu;  
     return next();   
  });
}

module.exports = route;
