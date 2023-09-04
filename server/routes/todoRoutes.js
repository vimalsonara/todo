const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// list todos
router.get('/', todoController.list_todos);
// create todos
router.post('/create', todoController.create_todo);
// delete todos
router.delete('/:id', todoController.delete_todo);

module.exports = router;
