const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  isDone: { type: Boolean, default: false },
  text: String,
  createdAt: { type: Number, default: Date.now },
});

module.exports = mongoose.model('Todo', TodoSchema);
