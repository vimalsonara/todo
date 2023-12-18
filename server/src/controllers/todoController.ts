import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import db from "../config/db.js";

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
  try {
    const { isDone, id } = req.body;

    if (isDone === undefined || !id) {
      res.status(400).json("Any details can't be empty");
    }

    const todo = await db.todo.findUnique({
      where: {
        id,
      },
    });

    if (todo) {
      const updateTodo = await db.todo.update({
        where: { id },
        data: {
          isDone,
        },
      });

      res.status(200).json({
        id: updateTodo.id,
        title: updateTodo.title,
        isDone: updateTodo.isDone,
        updatedAt: updateTodo.updatedAt,
      });
    } else {
      res.status(404);
      throw new Error("Todo not found");
    }
  } catch (error: any) {
    res.sendStatus(500);
  }
});

// @desc Delete todo
// route DELETE api/todos/todo
// @access priavte
export const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const id = req.body.id;

    if (!id) {
      res.status(400).json("Todo id can't be empty");
    }

    const todo = await db.todo.findUnique({
      where: { id },
    });

    if (todo) {
      await db.todo.delete({
        where: { id },
      });
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
