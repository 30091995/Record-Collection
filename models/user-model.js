const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema ({
  username : String,
  email : String,
  token : String,
  name : String
})

const User = mongoose.model('User', userSchema)
module.exports = User