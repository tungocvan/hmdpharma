class AccountController {
  // [GET] /
  index(req, res) {
    res.render('account/info',{ layout : 'layoutWebsite'});
  } 

}

module.exports = new AccountController();
