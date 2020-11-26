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
      product = productAll;
    }
    let category = readJson(tCategory);  
    let applCate = getCategoryByName(category,'my-pham');  
    global.product = product;
    global.applCate = applCate;
    res.render('home',{ layout : 'layoutWebsite' ,product,applCate});
  
    
    
    
  } 
}

module.exports = new SiteController();
 