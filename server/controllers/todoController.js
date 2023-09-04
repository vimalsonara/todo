const Todo = require('../models/todo');

// list todos
const list_todos = (req, res) => {
  Todo.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json({ title: 'All Todos', todos: result });
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

// delete todo
const delete_todo = (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ error: 'Todo not found' });
      } else {
        res.status(204).json();
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
  delete_todo,
};
