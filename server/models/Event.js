const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  id: [String],
  name: String,
  type: String,
  time: String,
  startDate: String,
  endDate: String,
  location: String,
  description: String,
  img: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
