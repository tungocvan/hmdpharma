
class CartController {
  // [GET] /
  index(req, res) {
    
    
    let id ;
    if(req.body.id) {
       id = parseInt(req.body.id);
    }else{
      id = parseInt(req.params['id']);
    }
    let product = global.product;
    if(!id) {
      if(global.totals === 0 || global.totals === undefined) return res.redirect('/'); 
    }else{
      let items = product.find(value => value.id == id);  
      if(global.idCart !== undefined){
        let find = global.idCart.findIndex(value => value.id == id);
        if(find === -1){
          if(req.body.sl) {
            items.quantity =  parseInt(req.body.sl);
          }else{
            items.quantity = 1 ;
          }
            
            items.total =items.quantity * items.salePrice;
            global.totals = parseInt(global.totals) + parseInt(items.total);
            global.idCart.push(items);
        }else{
          if(req.body.sl) {
            global.idCart[find].quantity = global.idCart[find].quantity + parseInt(req.body.sl);
          }else{
            global.idCart[find].quantity = global.idCart[find].quantity + 1;
          }
          

          global.idCart[find].total = parseInt(global.idCart[find].quantity) * parseInt(global.idCart[find].salePrice);
          global.totals = parseInt(global.totals) + parseInt(global.idCart[find].salePrice);
          items.total = items.salePrice * global.idCart[find].quantity;        
        }        
      }else{
        if(req.body.sl) {
          items.quantity = parseInt(req.body.sl) ;
          items.total = items.quantity * items.salePrice;
        }else{
          items.quantity = 1 ;
          items.total = items.salePrice;
        }        
        
        global.idCart = [items];
        global.totals = items.total;
        
        
      }
    }
    //res.locals.idCart = global.idCart; 
    //console.log('global.idCart:',global.idCart);
    res.render('cart',{ layout : 'layoutWebsite',idCart:global.idCart , totals:global.totals});
  } 
  
  delete(req, res){
    let id = parseInt(req.params['id']);  
    let find = global.idCart.findIndex(value => value.id == id);
    if(find !==-1){
      global.totals = global.totals - global.idCart[find].total;
      global.idCart.splice(find,1);  
      res.locals.idCart = global.idCart;
    }
    if(global.totals == 0) return res.redirect('/');
    // res.render('cart',{ layout : 'layoutWebsite',product: global.idCart , totals:global.totals});
    res.redirect('/cart');
  }

  updateQuantity(req, res){;
     //console.log('update id sl global.idCart:',req.body);
     let id = parseInt(req.body.id);
     let sl = parseInt(req.body.sl);

     let find = global.idCart.findIndex(value => value.id == id);
     
     global.idCart[find].quantity = sl;
     
     global.totals = global.totals - global.idCart[find].total;
     global.idCart[find].total = sl * global.idCart[find].salePrice;
     global.totals = global.totals + global.idCart[find].total; 
     //res.locals.idCart = global.idCart;     
     //res.render('cart',{ layout : 'layoutWebsite',idCart:global.idCart , totals:global.totals});
     res.render('cart',{ layout : 'layoutWebsite',idCart:global.idCart , totals:global.totals});
  }
}

module.exports = new CartController();
