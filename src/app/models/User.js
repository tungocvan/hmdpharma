// http://expressjs.com/en/starter/hello-world.html
// https://www.npmjs.com/package/mongoose-slug-generator
// https://mongoosejs.com/docs/documents.html
// https://www.npmjs.com/package/mongoose-delete
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;


const User = new Schema({
    firstname: { type: String , require:true },
    lastname: { type: String },
    birthday: { type: Date, default: Date.now },
    password: { type: String ,require:true},
    gender: String,
    email:{ type: String ,require:true , unique : true},
    phone:  Number,
    address: String,
    avatar: { type: String }, 
    status: {type: Boolean, default: false}
  },{ timestamps : true });

  mongoose.plugin(slug);
  User.plugin(mongooseDelete , { deletedAt : true , overrideMethods: 'all' });

module.exports = mongoose.model('User', User);
  