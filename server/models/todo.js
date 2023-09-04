const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    todo: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todos', todoSchema);
module.exports = Todo;
