const {readJson} = require('../libs/myFunction');
class productDetailsController {
  // [GET] /
  index(req, res) {
    let id = req.params['id'];    
    let tProduct = global.basedir + '/public/json/product.json';
    let productAll = readJson(tProduct);
    
    let items = productAll.find(value => value.id == id); 
    let albumImg = items.imgAlbum.split(',');  
    if(global.idCart){
       res.locals.idCart = global.idCart;    
       res.locals.totals = global.totals;
    }   
    
    res.render('productDetails',{ layout : 'layoutWebsite' , product:items , albumImg, productDetails:true});
  } 

}

module.exports = new productDetailsController();
