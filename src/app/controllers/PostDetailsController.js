const {readJson } = require('../libs/myFunction');
class postDetailsController {
  // [GET] /
  index(req, res) {
    let id = req.params['id'];    
    let tPost = global.basedir + '/public/json/post.json';
    let posts = readJson(tPost);
    let post = posts.find(value => value.id == id);   
    res.render('postDetails',{ layout : 'layoutWebsite' , post ,  postDetails:true});
  } 

}

module.exports = new postDetailsController();
