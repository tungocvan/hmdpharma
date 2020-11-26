class ContactController {
  // [GET] /
  index(req, res) {
    res.render('contact',{ layout : 'layoutWebsite'});
  } 

}

module.exports = new ContactController();
