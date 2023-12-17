import asyncHandler from "express-async-handler";
import Todo from "../models/todo.js";
import { Request, Response } from "express";
import db from "../config/db.js";
import { error } from "console";

// @desc List todos by userId
// @route POST api/todos
// @access private
export const listTodos = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json("User id can't be empty");
    }

    const todos = await db.todo.findMany({
      where: {
        userId: parseInt(userId),
      },
    });

    if (todos.length > 0) {
      res.status(200).json(todos);
    } else {
      res.sendStatus(404);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @desc Create new todo
// route POST api/todos/add
// @access private
export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { title, userId, content, isDone } = req.body;

    if (!userId || !title) {
      res.status(400).json("Any details can't be empty");
    }

    const todoData: any = {
      title,
      userId,
    };

    if (content !== undefined) {
      todoData.content = content;
    }

    if (isDone !== undefined) {
      todoData.isDone = isDone;
    }

    const todo = await db.todo.create({
      data: todoData,
    });

    if (todo) {
      res.sendStatus(201);
    } else {
      res.status(400).json({ error: "Error while creting todo" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @desc Update todo status
// route PUT api/todos/todo
// @access private
export const updateTodoStatus = asyncHandler(async (req, res) => {
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
export const deleteTodo = asyncHandler(async (req, res) => {
  const id = req.body.id;
  try {
    const data = await Todo.findByIdAndDelete({ _id: id });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json(error);
  }
});
