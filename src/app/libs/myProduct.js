const fs = require('fs');
var items = [];
var productArray = [
    {"id":1,"title":"Simple Black Clock","price":16,"salePrice":10,"img":"/azshopweb/images/product/1.png","albumImg":"1.png;2.png;3.png;4.png","content":"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod temf incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostr exercitation ullamco laboris nisi ut aliquip ex ea</p>"},
    {"id":2,"title":"BO&Play Wireless Speaker","price":16,"salePrice":10,"img":"/azshopweb/images/product/2.png","albumImg":"1.png;2.png;3.png;4.png","content":"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod temf incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostr exercitation ullamco laboris nisi ut aliquip ex ea</p>"},
    {"id":3,"title":"Brone Candle","price":16,"salePrice":10,"img":"/azshopweb/images/product/3.png","albumImg":"1.png;2.png;3.png;4.png","content":"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod temf incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostr exercitation ullamco laboris nisi ut aliquip ex ea</p>"},
    {"id":4,"title":"Brone Lamp Glasses Clock","price":16,"salePrice":10,"img":"/azshopweb/images/product/4.png","albumImg":"1.png;2.png;3.png;4.png","content":"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod temf incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostr exercitation ullamco laboris nisi ut aliquip ex ea</p>"},
    {"id":5,"title":"Clothes Boxed","price":16,"salePrice":10,"img":"/azshopweb/images/product/5.png","albumImg":"1.png;2.png;3.png;4.png","content":"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod temf incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostr exercitation ullamco laboris nisi ut aliquip ex ea</p>"},
    {"id":6,"title":"Liquid Unero Ginger Lily","price":16,"salePrice":10,"img":"/azshopweb/images/product/6.png","albumImg":"1.png;2.png;3.png;4.png","content":"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod temf incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostr exercitation ullamco laboris nisi ut aliquip ex ea</p>"},
    {"id":7,"title":"Miliraty Backpack","price":16,"salePrice":10,"img":"/azshopweb/images/product/7.png","albumImg":"1.png;2.png;3.png;4.png","content":"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod temf incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostr exercitation ullamco laboris nisi ut aliquip ex ea</p>"},
    {"id":8,"title":"Saved Wines Corkscrew","price":16,"salePrice":10,"img":"/azshopweb/images/product/8.png","albumImg":"1.png;2.png;3.png;4.png","content":"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod temf incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostr exercitation ullamco laboris nisi ut aliquip ex ea</p>"},

   ] ;
function productById(id) {
    return productArray.find(value => value.id == id);
}
// async function getProduct() {
//     let t =  './src/public/json/product.json';
//     let dataProduct = await fs.readFile(t,'utf8', (err, data) => {
//         if (err) throw err;
//         let product = JSON.parse(data);
//         return product.data;                
//      }) 
//      return dataProduct;
// }   


module.exports = {
  //  product : getProduct(),
    productById
}
