import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    todo: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todos", todoSchema);
export default Todo;
