import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import Todo from "./models/todo.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

// error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
