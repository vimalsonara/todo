const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// list todos
router.get('/todos', todoController.list_todos);
// create todos
router.post('/todos', todoController.create_todo);
// update todo status
router.put('/:id', todoController.update_todo_status);
// delete todos
router.delete('/:id', todoController.delete_todo);

module.exports = router;
