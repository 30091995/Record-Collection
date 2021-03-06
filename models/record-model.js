const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const recordSchema = new Schema({
  artist : String,
  title: String,
  imgUrl : String,
  recordMainRelease : String,
  owners : [{type: Schema.Types.ObjectId, ref: 'User'}],
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record