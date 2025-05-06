const mongoose = require('mongoose');

const NameSchema = new mongoose.Schema({
  idea: { type: String, required: true },
  result: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GeneratedName', NameSchema);
