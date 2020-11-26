//const product = require('../libs/myProduct');
class productDetailsController {
  // [GET] /
  index(req, res) {
    let id = req.params['id'];    

    //let items = product.productById(id);
    //console.log('global.product:',global.product);
    
    let items = global.product.find(value => value.id == id); 
    let albumImg = items.imgAlbum.split(',');  
    if(global.idCart){
       res.locals.idCart = global.idCart;    
       res.locals.totals = global.totals;
    }   
    
    res.render('productDetails',{ layout : 'layoutWebsite' , product:items , albumImg, productDetails:true});
  } 

}

module.exports = new productDetailsController();
