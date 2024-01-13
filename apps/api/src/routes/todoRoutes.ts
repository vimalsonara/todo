import express from "express";
import {
  listTodos,
  createTodo,
  updateTodoStatus,
  deleteTodo,
} from "../controllers/todoController";
const router = express.Router();
import { protect } from "../middleware/authMiddleware";

router.route("/").post(protect, listTodos);
router.route("/add").post(protect, createTodo);
router
  .route("/todo")
  .post(protect, updateTodoStatus)
  .delete(protect, deleteTodo);

export default router;
