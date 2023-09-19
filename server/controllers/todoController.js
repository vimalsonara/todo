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
const updateTodoStatus = (req, res) => {
  const { completed, id } = req.body;

  Todo.findByIdAndUpdate(id, { completed }, { new: true })
    .then((result) => {
      if (!result) {
        res.status(404).json({ error: "Todo not found" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// @desc Delete todo
// route DELETE api/todos/todo
// @access priavte
const deleteTodo = (req, res) => {
  const id = req.body.id;
  Todo.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ error: "Todo not found" });
      } else {
        res.status(201).json({ message: "Todo deleted successfully." });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

export { listTodos, createTodo, updateTodoStatus, deleteTodo };
