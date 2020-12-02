const fs = require('fs');
const Buffer = require('buffer/').Buffer;
//const path = require('path'); 
const {addCssMenu} = require('../libs/myMenu');
const {readJson ,ChangeToSlug, writeJson } = require('../libs/myFunction');


function cateToSlug(str) {
  let slugProductArr = str.split(",");
  let slugProduct = "";
  for(let i=0; i<slugProductArr.length;i++){
    if( i===slugProductArr.length-1){
      slugProduct = slugProduct +  ChangeToSlug(slugProductArr[i]);
    }else{
      slugProduct = slugProduct +  ChangeToSlug(slugProductArr[i])+',';
    }    
  }
  return slugProduct;
}            
class AdminController {
  // [GET] /
  index(req, res) {
    //console.log('slug:',ChangeToSlug('Từ-N-'));
    
    global.myCategory = readJson(global.basedir + '/public/json/category.json'); 
    let myDvt  =  readJson(global.basedir + '/public/json/attrib.json');                 
    global.myDvt = myDvt.dvt;
    let t = global.basedir + '/public/json/product.json';
    fs.readFile(t, (err, data) => {
      if (err) throw err;
      let productData = JSON.parse(data);
      let items = productData.data;
      global.product = items;     
      res.render('admin/admin',{ layout : 'layoutAdmin'});         
    })
    
  } 
  menu(req, res) {
      //console.log('menu:',menu.menu);    
      // let t = global.basedir + '/public/azshopweb/menu/menuTop.json';
      // // đọc menu
      // fs.writeFile(t,JSON.stringify({"menu":menu.menu}), (err) => {
      //   if (err) throw err;
      //   res.render('admin/menu',{ layout : 'layoutAdmin'});        
      // }); 
      
  } 
  product(req, res) {
     
     
      switch (req.params.id) {
        
        case 'createProduct':         
                
        res.render('admin/admin',{ layout : 'layoutAdmin', createProduct:true , summernote:true,myCategory, myDvt:global.myDvt});  
        break;
        case 'createCategory':
        var item = [];
        var slug = '';
        if(req.params.slug){
           slug = req.params.slug;
           item = global.myCategory.find(value => value.id ==req.params.slug);
        }        
        res.render('admin/admin',{ layout : 'layoutAdmin', createCategory:true,myCategory,item,slug});
        break;
        default:  
          res.render('admin/admin',{ layout : 'layoutAdmin' , product:true, items:global.product});
          break;
      }
      
      
  } 
  upload(req, res,next) {
     let files  = req.body;
     let name = files.name;  
     let t = global.basedir + files.des + name;
     let img = files.tmp_name;
     let data = img.replace(/^data:image\/\w+;base64,/, "");
     let buf = new Buffer(data, 'base64');  
     //let  buf = Buffer.from(data, 'base64');
     //let imageBuffer = decodeBase64Image(data);
     fs.writeFile(t, buf, (err) => {
            if (err) throw err;
            res.json({"message":"Upload Ok !!!"});        
     }); 
    
   
  } 
  createProduct(req, res) {
    // res.json(req.body);  
     let items = [];
     let t = global.basedir + '/public/json/product.json';
     if (fs.existsSync(t)) {      
        fs.readFile(t, (err, data) => {
          if (err) throw err;
          let product = JSON.parse(data);
          items = product.data;
          // tim max id
          let idArray = items.map((item)=> {
            return item.id;
          })
          let idMax = Math.max(...idArray);
          req.body.id = parseInt(idMax) + 1;    
          req.body.slug = cateToSlug(req.body.category) ;                            
          items.push(req.body);
          global.product = items;
          fs.writeFile(t,JSON.stringify({"data":items}), (err) => {
            if (err) throw err;
            return res.redirect('/admin/product');       
          }); 
          })      
     }else{
      req.body.id = 1;       
      req.body.slug = cateToSlug(req.body.category) ;
      items.push(req.body); 
      global.product = items;
      fs.writeFile(t,JSON.stringify({"data":items}), (err) => {
        if (err) throw err;
        res.redirect('/admin/product');       
      });
     }     

  }
  
  productDelete(req, res) {
      let id = parseInt(req.params.id);
      let items = global.product;
      //console.log('items product:',items);      
      let dataNew = items.filter(item => item.id != id);
      global.product = dataNew;
      let t = global.basedir + '/public/json/product.json';
      fs.writeFile(t,JSON.stringify({"data":dataNew}), (err) => {
        if (err) throw err;        
        return res.redirect('/admin/product');       
      });     

  }

  updateProduct(req, res) {
      // https://handlebarsjs.com/api-reference/data-variables.html#root
      let id = parseInt(req.params.id);
      let items = global.product;
      let dataNew = items.find(item => item.id == id);
           
      let album = dataNew.imgAlbum.split(',');
      let category = [];
      if(dataNew.category !== undefined) {
        category = dataNew.category.split(',');
      }
 
      res.render('admin/admin',{ layout : 'layoutAdmin', updateProduct:true , summernote:true, item:dataNew , myCategory, album, category , myDvt:global.myDvt});   

  }
  updateProductById(req, res) {
      //res.json(req.body.id);
      let id = parseInt(req.body.id);
      let items = global.product;
      let index = items.findIndex(item => item.id == id);
      // let slugProductArr = req.body.category.split(",");
      // let slugProduct = "";
      // for(let i=0; i<slugProductArr.length;i++){
      //   if( i===slugProductArr.length-1){
      //     slugProduct = slugProduct +  ChangeToSlug(slugProductArr[i]);
      //   }else{
      //     slugProduct = slugProduct +  ChangeToSlug(slugProductArr[i])+',';
      //   }
        
      // }
      req.body.slug = cateToSlug(req.body.category) ;
      items[index] = req.body;
      global.product = items;
      let t = global.basedir + '/public/json/product.json';
      fs.writeFile(t,JSON.stringify({"data":items}), (err) => {
        if (err) throw err;
        res.redirect('/admin/product');      
      }); 

  }

  copyProduct(req, res) {
    let id = parseInt(req.params.id);
      
    let items = global.product;    
    let idArray = items.map((value)=> {
      return value.id;
    })
    let idMax = Math.max(...idArray);
    let item = items.find(value => value.id == id);
    item.id = parseInt(idMax) + 1;  
    let t = global.basedir + '/public/json/product.json';
    let itemNew = readJson(t); 
    itemNew.push(item);
    global.product = itemNew;
    fs.writeFile(t,JSON.stringify({"data":itemNew}), (err) => {
      if (err) throw err;      
      return res.redirect('/admin/product');      
    });
  }

  createCategory(req, res) {
    var items = global.myCategory;
    let id = parseInt(req.params.id);
    if(id){
       let items = global.myCategory;
       let index = items.findIndex(value => value.id == id);
       req.body.id = id;
       items[index] = req.body;       
    }else{      
      let idArray = items.map((item)=> { 
        return item.id;
      })
      let idMax = Math.max(...idArray);
      req.body.id = parseInt(idMax) + 1;
      req.body.slug = ChangeToSlug(req.body.name);
      items.push(req.body);    
    }
    let t= global.basedir + '/public/json/category.json';
    fs.writeFile(t,JSON.stringify({"data":items}), (err) => {
      if (err) throw err;
      global.myCategory = items;
      return res.redirect('/admin/product/createCategory');       
    }); 

  
  }
  categoryDelete(req, res) {
    let id = parseInt(req.params.id);
    let items = global.myCategory;
    let dataNew = items.filter(item => item.id !== id);
    let t = global.basedir + '/public/json/category.json';
    fs.writeFile(t,JSON.stringify({"data":dataNew}), (err) => {
      if (err) throw err;
      global.myCategory = dataNew;
      return res.redirect('/admin/product/createCategory');      
    });   
  }

  menuTop(req, res) {
    let t = global.basedir + '/public/json/dataMenu.json';
    let menuData = readJson(t);
    //res.json(menuData);
    
    if(req.params.slug == "delete"){
      let id = req.params.id;
      let myMenu = menuData.filter(value => value.id != id);
      fs.writeFile(t,JSON.stringify({"data":myMenu}), (err) => {
        if (err) throw err;              
        return res.redirect('/admin/menuTop');     
       });       
    } 
    if(req.params.slug == "edit"){
      let id = req.params.id;
      //console.log('id:',id);
      let myCategory =  menuData.map(value => {
        return {"id":value.id,"name":value.name}
      });
      if(id !==0){
        let myMenu = menuData.find(value => value.id == id);        
        res.render('admin/admin',{ layout : 'layoutAdmin' , menuTop:true , item:myMenu,myCategory,editMenu:true});
      }else{        
        res.render('admin/admin',{ layout : 'layoutAdmin' , menuTop:true,myCategory,editMenu:true});
      }    
            
    } 
    if(req.params.slug == "update"){      
      let id = parseInt(req.params.id);
      if(id !==0){
        req.body.id = id;
        req.body.slug = ChangeToSlug(req.body.name);
        let index = menuData.findIndex(value => value.id == id);
        menuData[index] = req.body;
        //res.json(menuData);        
      }else{
        if(menuData.length === 0) {
          req.body.id = 1;
        }else{
          let idArray = menuData.map((item)=> {
            return item.id;
          });
          let idMax = Math.max(...idArray);
          req.body.id = parseInt(idMax) + 1; 
        }
        req.body.slug = ChangeToSlug(req.body.name);
        menuData.push(req.body);
        //res.json(req.body);
      }
      fs.writeFile(t,JSON.stringify({"data":menuData}), (err) => {
          if (err) throw err;
          let tMenu =global.basedir + '/public/azshopweb/menu/menuTop.json';
          fs.writeFile(tMenu,JSON.stringify({"menu":addCssMenu(menuData)}), (err) => {            
            if (err) throw err;            
            res.redirect('/admin/menuTop');      
        });
              
      });
    }
    
    if(req.params.slug == undefined){
      res.render('admin/admin',{ layout : 'layoutAdmin' , menuTop:true , menuData});
    }
  }
  footer(req, res) {
    res.render('admin/admin',{ layout : 'layoutAdmin' , footer:true});
  }
  order(req, res) {
    let t = global.basedir + '/public/json/dataDonHang.json'; 
    let items = readJson(t);
    let trangthai = ['Chờ xác nhận đơn hàng.','Đang xữ lý','Hủy đơn hàng','Đang vận chuyển','Hoàn thành','Thất bại'];
    res.render('admin/admin',{ layout : 'layoutAdmin' , order:true, items,trangthai});
  }
  orderDetails(req, res) {
    let slug = req.params.slug;    
    let id = parseInt(req.params.id);
    let t = global.basedir + '/public/json/dataDonHang.json'; 
    let items = readJson(t);
    let item = items.find(value => value.id == id);
    let trangthai = ['Chờ xác nhận đơn hàng.','Đang xữ lý','Hủy đơn hàng','Đang vận chuyển','Hoàn thành','Thất bại'];
    if(slug){
        
        let index = items.findIndex(value => value.id == id);
        if(index !== -1){
           items[index].status = trangthai[slug];
           //res.json(items);
           fs.writeFile(t,JSON.stringify({"data":items}), (err) => {
            if (err) throw err;
            return res.redirect('/admin/order');       
          }); 
           
        }
        
    }else{     
      
      res.render('admin/admin',{ layout : 'layoutAdmin' , orderDetails:true, item,trangthai});
    }
    
  }
  account(req, res) {
    var chucvu = ['Khách hàng','Biên tập viên','Quản trị'];
    var gioitinh = ['Nam','Nữ','Khác'];
    let t = global.basedir + '/public/json/dataKhach.json';
    let items = readJson(t);
 
    switch (req.params.slug) {      
      case 'createAccount':  
      res.render('admin/admin',{ layout : 'layoutAdmin' , createAccount:true, items});  
      break;
      case 'editAccount':
      let idEdit = req.params.id;
      let item = items.find(value => value.id == idEdit);    
      res.render('admin/admin',{ layout : 'layoutAdmin' , editAccount:true, item,chucvu,gioitinh});  
      break;
      case 'deleteAccount':  
        let id = req.params.id;
        let itemsNew = items.filter(value => value.id !=id);
        fs.writeFile(t,JSON.stringify({"data":itemsNew}), (err) => {
        if (err) throw err;
        return res.redirect('/admin/account');       
        }); 
      break;
      default:  
        res.render('admin/admin',{ layout : 'layoutAdmin' , account:true, items});
      break;
    }  
    
  }
 
  updateAccount(req, res) {
    let t = global.basedir + '/public/json/dataKhach.json';
    let items = readJson(t); 
    if(req.body.email){
      if(req.params.id){
          let id = parseInt(req.params.id);
          let index = items.findIndex(value => value.id == id) ;
          req.body.id = id;
          items[index] = req.body;
      }else{               
            let idArray = items.map((item)=> {
              return item.id;
            })
            let idMax = Math.max(...idArray);
            req.body.id = parseInt(idMax) + 1;
            items.push(req.body);
      }      
        fs.writeFile(t,JSON.stringify({"data":items}), (err) => {
        if (err) throw err;              
        if(req.params.slug){          
          global.profile = req.body;
          return res.redirect('/register'); 
        } 
        return res.redirect('/admin/account');       
       }); 
   
    }
  }

  post(req, res) {
    //var items =items;
    var tPost = global.basedir + '/public/json/post.json';
    var posts = [];
    let idEdit = 0;
    var tCate = global.basedir + '/public/json/catepost.json';
    var myCategory = readJson(tCate);
    if (!fs.existsSync(tPost)) {
      req.body.id = 1;        
    }else{
        posts = readJson(tPost);
    }  
    switch (req.params.slug) {      
      case 'listPost':   
      if(req.params.action === "delete"){
        let dataNew = posts.filter(value => value.id != req.params.id); 
        fs.writeFile(tPost,JSON.stringify({"data":dataNew}), (err) => {
          if (err) throw err;
          return res.redirect('/admin/post/listPost/');      
        }); 
      }     
      res.render('admin/admin',{ layout : 'layoutAdmin', listPost:true, items:posts});  
      break;
      case 'createPost':  
       
      if(req.params.action === "edit"){
        idEdit = req.params.id;
        let item = posts.find(value => value.id == idEdit);
         res.render('admin/admin',{ layout : 'layoutAdmin',isEdit:true, createPost:true,summernote:true,myCategory,item,idEdit});
      }
      if(req.params.action === "create"){
        req.body.slug = ChangeToSlug(req.body.title);
        if(req.body.id != 1){
          let idArray = posts.map((item)=> { 
            return item.id;
          })
          let idMax = Math.max(...idArray);
          req.body.id = parseInt(idMax) + 1;
        }
        if(req.params.id == 0){          
          posts.push(req.body);
        }else{      
            let index = posts.findIndex(value => value.id == req.params.id);
            req.body.slug = ChangeToSlug(req.body.title);
            req.body.id = req.params.id; 
            posts[index] = req.body;               
        }
        fs.writeFile(tPost,JSON.stringify({"data":posts}), (err) => {
          if (err) throw err;
          return res.redirect('/admin/post/listPost/');      
        }); 

      
      }
      if(req.params.action === undefined){
      res.render('admin/admin',{ layout : 'layoutAdmin', createPost:true , summernote:true,myCategory}); 
      }
      break;
      case 'categoryPost': 
      let t = global.basedir + '/public/json/catepost.json';
      let items = readJson(t); 
      let item = [];
      let id = 0;
      if(req.params.action === "create"){
        if(req.params.id == 0){
          let idArray = items.map((item)=> { 
            return item.id;
          })
          let idMax = Math.max(...idArray);
          req.body.id = parseInt(idMax) + 1;
          req.body.slug = ChangeToSlug(req.body.name);
          //res.json(req.body);
          items.push(req.body);           
        }else{
            let index = items.findIndex(value => value.id == req.params.id);
            req.body.slug = ChangeToSlug(req.body.name);
            req.body.id = req.params.id; 
            items[index] = req.body;
        }
        fs.writeFile(t,JSON.stringify({"data":items}), (err) => {
          if (err) throw err;
          return res.redirect('/admin/post/categoryPost/');      
        });         
        
      }
      if(req.params.action === "edit"){
        id = req.params.id;
        item = items.find(value => value.id == id);
        res.render('admin/admin',{ layout : 'layoutAdmin',isEdit:true, categoryPost:true,myCatePost:items,item,id});
      }      
      if(req.params.action === "delete"){
        let id = req.params.id;
        let dataNew = items.filter(value => value.id != id);
        // items = dataNew;     
        fs.writeFile(t,JSON.stringify({"data":dataNew}), (err) => {
          if (err) throw err;
          return res.redirect('/admin/post/categoryPost/');      
        }); 
      }
      if(req.params.action === undefined){
        res.render('admin/admin',{ layout : 'layoutAdmin', categoryPost:true,myCatePost:items,item,id});
      }
      break;

      default:  
        res.render('admin/admin',{ layout : 'layoutAdmin', listPost:true});
        break;
    }
  } 

  checkField(req, res) {
     //console.log('req.body:',req.body);
     let t = global.basedir + req.body.t;
     let field = req.body.field;
     let items = readJson(t);
     let findEmail = items.findIndex(value =>value.email == field); 
     if(findEmail === -1){
       res.json({"message":false});
     }else{
      res.json({"message":true});
     }
     
  }
}

module.exports = new AdminController();
