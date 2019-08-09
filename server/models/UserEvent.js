const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userEventSchema = new Schema({
  userId: String,
  title: String,
  date: String,
  time: String
});

const UserEvent = mongoose.model('UserEvent', userEventSchema);

module.exports = UserEvent;
