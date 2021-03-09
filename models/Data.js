const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true  
  },
  userName: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Data = mongoose.model('Data', DataSchema);