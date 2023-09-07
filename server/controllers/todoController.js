const Todo = require('../models/todo');

// list todos
const list_todos = (req, res) => {
  Todo.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json({ todos: result });
      console.log('list todos');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// create todo
const create_todo = (req, res) => {
  const todo = new Todo(req.body);

  todo
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// update todo status
const update_todo_status = (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;

  Todo.findByIdAndUpdate(id, { completed }, { new: true })
    .then((result) => {
      if (!result) {
        res.status(404).json({ error: 'Todo not found' });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// delete todo
const delete_todo = (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ error: 'Todo not found' });
      } else {
        res.status(201).json({ message: 'Todo deleted successfully.' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

module.exports = {
  list_todos,
  create_todo,
  update_todo_status,
  delete_todo,
};
