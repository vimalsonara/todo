import express from "express";
import {
  list_todos,
  create_todo,
  update_todo_status,
  delete_todo,
} from "../controllers/todoController.js";
const router = express.Router();

// list todos
router.get("/todos", list_todos);
// create todos
router.post("/todos", create_todo);
// update todo status
router.put("/:id", update_todo_status);
// delete todos
router.delete("/:id", delete_todo);

export default router;
