import express from "express";
import {
  list_todos,
  create_todo,
  update_todo_status,
  delete_todo,
} from "../controllers/todoController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

// list todos
router.route("/").get(protect, list_todos);
// create todos
router.route("/add").post(protect, create_todo);
// update todo status
router.route("/:id").put(protect, update_todo_status);
// delete todos
router.route("/:id").delete(protect, delete_todo);

export default router;
