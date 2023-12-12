import asyncHandler from "express-async-handler";
import Todo from "../models/todo.js";

// @desc List todos by userId
// @route POST api/todos
// @access private
const listTodos = (req, res) => {
  const { userId } = req.body;

  Todo.find({ userId })
    .sort({ createdAt: -1 })
    .then((todos) => {
      res.status(200).json(todos);
      console.log("list todos");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// @desc Create new todo
// route POST api/todos/add
// @access private
const createTodo = (req, res) => {
  const todo = new Todo(req.body);

  todo
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// @desc Update todo status
// route PUT api/todos/todo
// @access private
const updateTodoStatus = asyncHandler(async (req, res) => {
  const { completed, id } = req.body;

  const todo = await Todo.findById(id);

  if (todo) {
    todo.completed = completed;
    const updatedTodo = await todo.save();
    res.status(200).json({
      id: updatedTodo._id,
      completed: updatedTodo.completed,
    });
  } else {
    res.status(404);
    throw new Error("Todo not found");
  }
});

// @desc Delete todo
// route DELETE api/todos/todo
// @access priavte
const deleteTodo = asyncHandler(async (req, res) => {
  const id = req.body.id;
  try {
    const data = await Todo.findByIdAndDelete({ _id: id });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json(error);
  }
});

export { listTodos, createTodo, updateTodoStatus, deleteTodo };
