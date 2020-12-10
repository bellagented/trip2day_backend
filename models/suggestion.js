const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  store: {
    type: String,
    required: true
  },
  accepted: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('Suggestion', suggestionSchema);