const fs = require('fs');
const {readJson,writeJson} = require('../libs/myFunction');
class CheckoutController {
  // [GET] /
  index(req, res) {
    let message = false;
    if(global.idCart){
      res.locals.idCart = global.idCart;    
      res.locals.totals = global.totals;
    }else{
      return res.redirect('/');
    } 
    if(global.profile){
       res.locals.profile = global.profile;
    }
    if(req.params.slug){
      message = true
    }
     
    res.render('checkout',{ layout : 'layoutWebsite', message});
  } 
  payment(req, res) {
    
    if(global.idCart){
      req.body.idCart = global.idCart;    
      req.body.totals = global.totals;
    }else{
      return res.redirect('/');
    }  
    
   if(!req.body.firstName || !req.body.email || !req.body.phone || !req.body.address){
      global.profile = req.body;
      return res.redirect('/checkout/message');      
   }
   
   if(req.body.save === "on"){
    let t = global.basedir + '/public/json/dataKhach.json';
    let items = readJson(t);
    let find = items.findIndex(value => value.email == req.body.email);
    console.log('find:',find);
    if(find === -1) {
      let idArray = items.map((item)=> {
        return item.id;
      })
      let idMax = Math.max(...idArray);      
      let account = {
        "firstName":req.body.firstName,
        "lastName":req.body.lastName,
        "email":req.body.email,
        "phone":req.body.phone,
        "address":req.body.address,
        "password":"123456",
        "id":parseInt(idMax) + 1
      }
      items.push(account);
      let t = global.basedir + '/public/json/dataKhach.json';
      writeJson(items,t); 
    }
      
      
   }

    let date = new Date();
    req.body.date = date.toString();
    req.body.status = "Chờ xác nhận đơn hàng."
    
    let t = global.basedir + '/public/json/dataDonHang.json';     
    if (fs.existsSync(t)) {    
      let items = readJson(t);         
      let idArray = items.map((item)=> {
        return item.id;
      })
      let idMax = Math.max(...idArray);
      req.body.id = parseInt(idMax) + 1
      items.push(req.body);
      fs.writeFile(t,JSON.stringify({"data":items}), (err) => {
        if (err) throw err;
        global.idCart = [];
        global.totals = 0;
        return res.redirect('/');        
       }); 
      
    }else{
       req.body.id = 1;
       let items = [];
       items.push(req.body);
       fs.writeFile(t,JSON.stringify({"data":items}), (err) => {
        if (err) throw err;
        global.idCart = [];
        global.totals = 0;
        return res.redirect('/');        
       }); 
    }
    

  } 
 
}

module.exports = new CheckoutController();
