import express from "express";
import {
  listTodos,
  createTodo,
  updateTodoStatus,
  deleteTodo,
} from "../controllers/todoController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, listTodos);
router.route("/add").post(protect, createTodo);
router.route("/todo").put(protect, updateTodoStatus).post(protect, deleteTodo);

export default router;
