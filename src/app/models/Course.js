// http://expressjs.com/en/starter/hello-world.html
// https://www.npmjs.com/package/mongoose-slug-generator
// https://mongoosejs.com/docs/documents.html
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Course = new Schema({
    name: { type: String , require:true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String , require:true},
    level: { type: String },
    slug: { type: String, slug: 'name' , unique : true }
  },{ timestamps : true });

  mongoose.plugin(slug);
  Course.plugin(mongooseDelete , { deletedAt : true , overrideMethods: 'all' });

  module.exports = mongoose.model('Course', Course);
  