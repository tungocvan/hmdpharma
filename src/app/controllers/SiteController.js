const {readJson,getCategoryByName,ChangeToSlug} = require('../libs/myFunction');
const fs = require('fs');
class SiteController {
  // [GET] /
  index(req, res) {
         
    if(global.idCart){
      res.locals.idCart = global.idCart;    
      res.locals.totals = global.totals;
    }
    let tProduct = global.basedir + '/public/json/product.json';
    let tCategory= global.basedir + '/public/json/category.json';
    let productAll = readJson(tProduct);
    let product = [];
    let productMypham = [];
    let productSuckhoe = [];
    let isHome = false;
    let applCate;
    let isMypham = false;
    if(req.params.slug){      
     
    productAll.forEach(value => {
         let category = value.category.split(',');
         category.forEach((cate)=>{
           if(ChangeToSlug(cate) == req.params.slug){
                product.push(value);
           }
         })
    })
    }else{
      isHome = true;
      //product = productAll.splice(1,8);
      productMypham = productAll.filter(value =>value.slug.includes("my-pham")).splice(0,8);
      productSuckhoe = productAll.filter(value =>value.slug.includes("ho-tro-suc-khoe"));
    }
    let category = readJson(tCategory);  
    console.log('home:',req.params.slug);
    if(req.params.slug === "ho-tro-suc-khoe"){
        isMypham = false;
    }else{
      isMypham = true;
    }
    applCate = getCategoryByName(category,'my-pham'); 
    // global.product = product;
    // global.applCate = applCate;
       
    
    res.render('home',{ layout : 'layoutWebsite' ,product,applCate,isHome,productMypham,productSuckhoe,isMypham});
  
    
    
    
  } 
}

module.exports = new SiteController();
 