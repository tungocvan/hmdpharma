class WishlistController {
  // [GET] /
  index(req, res) {
    res.render('wishlist',{ layout : 'layoutWebsite'});
  } 

}

module.exports = new WishlistController();
