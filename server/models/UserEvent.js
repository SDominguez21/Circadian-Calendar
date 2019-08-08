const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userEventSchema = new Schema({
  time: String,
  title: String
});

const User = mongoose.model('User', userSchema);

module.exports = UserEvent;
