const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    content: { type: String, require: true },
    docstate: { type: String, require: true }
});

module.exports = mongoose.model('Todo', todoSchema);