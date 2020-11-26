const fs = require('fs');
const {readJson } = require('../libs/myFunction');
var chucvu = ['Khách hàng','Biên tập viên','Quản trị'];
var gioitinh = ['Nam','Nữ','Khác'];
class LoginRegisterController {
  // [GET] /
  index(req, res) {
    if(global.isLogin){
      res.locals.profile = global.profile;
      let slug = req.params.slug;
      switch (slug) {
        case 'info':
          let item = global.profile;
          res.render('myAccount',{ layout : 'layoutWebsite', slug:'Thông Tin Tài Khoản',info:true,item,chucvu,gioitinh});
          break;
        case 'order':
          let email = global.profile.email;                    
          let t = global.basedir + '/public/json/dataDonHang.json'; 
          let items = readJson(t);
          let itemOrder = items.filter(value => value.email == email);
          res.render('myAccount',{ layout : 'layoutWebsite', slug:'Theo dõi đơn hàng',order:true,itemOrder});
          break;
        case 'orderDetails':
          let id = req.params.id;
          let tDh = global.basedir + '/public/json/dataDonHang.json'; 
          let itemsDH = readJson(tDh);
          let itemDh = itemsDH.find(value => value.id == id);                   
          res.render('myAccount',{ layout : 'layoutWebsite', slug:'Đơn hàng chi tiết',orderDetails:true,item:itemDh});
          break;
        case 'wishlist':
          res.render('myAccount',{ layout : 'layoutWebsite', slug:'Sản phẩm yêu thích',wishlist:true});
          break;
        case 'history':
          res.render('myAccount',{ layout : 'layoutWebsite', slug:'Lịch sử giao dịch',history:true});
          break;
        default:
          res.render('myAccount',{ layout : 'layoutWebsite', slug});
          break;
      }
      
    }else{       
       res.render('loginRegister',{ layout : 'layoutWebsite' , isLog:'show active'});
    }      
  } 
  logout(req, res) {
    if(global.isLogin){
      global.isLogin = false;
      return res.redirect('/');
    }
  } 
  register(req, res,next) {    
    let t = global.basedir + '/public/json/dataKhach.json';  
    let items = readJson(t);
    if(req.body.firstName === undefined){
        // login
         let email = req.body.email;
         let password = req.body.password;
         let indexIdEdit = items.find(i => i.email === email && i.password === password); 
         if(indexIdEdit) {
              global.isLogin = true;          
              global.profile = indexIdEdit;        
              return  res.redirect('/register');
          }else{
            res.render('loginRegister',{ layout : 'layoutWebsite' , isLog:'show active'});
          } 
    }else{
        // register
       let email = req.body.email;
       let indexIdEdit = items.findIndex(i => i.email === email);        
       if(indexIdEdit === -1) {
        let idArray = items.map((item)=> {
          return item.id;
        })
        let idMax = Math.max(...idArray);
        req.body.id = parseInt(idMax) + 1;
         items.push(req.body);
          fs.writeFile(t,JSON.stringify({"data":items}), (err) => {
            if (err) throw err;
            return res.redirect('/');        
          }); 
       }else{
         res.render('loginRegister',{ layout : 'layoutWebsite' , isReg:'show active'});
       }   
    }
    // if(req.body.firstName === undefined){
    //   console.log('login');       
    //   fs.readFile(t, (err, data) => {
    //     if (err) throw err;
    //      let dataKh = JSON.parse(data);
    //      let items = dataKh.data;       
    //      let email = req.body.email;
    //      let password = req.body.password;
    //      let indexIdEdit = items.find(i => i.email === email && i.password === password);       
    //      //console.log('indexIdEdit:',indexIdEdit);                 
    //      if(indexIdEdit) {
    //         global.isLogin = true;          
    //         global.profile = indexIdEdit;        
    //         return  res.redirect('/');
    //      }     
    //      res.render('loginRegister',{ layout : 'layoutWebsite' , isLog:'show active'});
         

    //   });
      
       
    // }else{
    //   console.log('register');         
    //   fs.readFile(t, (err, data) => {
    //     if (err) throw err;
    //      let dataKh = JSON.parse(data);
    //      let items = dataKh.data;       
    //      let email = req.body.email;
    //      let indexIdEdit = items.findIndex(i => i.email === email);        
    //      if(indexIdEdit === -1) {
    //         req.body.lastName = "";
    //         req.body.phone = "";
    //         req.body.address = "";
    //         items.push(req.body);
    //         fs.writeFile(t,JSON.stringify({"data":items}), (err) => {
    //           if (err) throw err;
    //           return res.redirect('/');        
    //         }); 
    //      }else{
    //        res.render('loginRegister',{ layout : 'layoutWebsite' , isReg:'show active'});
    //      }         
        
    //   });
      
    // }
    
  } 

}

module.exports = new LoginRegisterController();
