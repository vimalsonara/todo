import Header from "@/components/Header";
import TodoItem from "@/components/TodoItem";
import { Button } from "@/components/ui/button";
import { api } from "@/config/api.ts";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import useUserStore from "../store/UserStore.ts";

interface Todo {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { user } = useUserStore();

  // LIST ALL TODOS API
  useEffect(() => {
    async function getTodos() {
      try {
        const response = await api.post("api/todos/", {
          userId: user?.id,
        });
        setTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTodos();
  }, []);

  // DELETE TODO API
  const handleDeleteTodo = async (id: number) => {
    try {
      await api.delete("api/todos/todo", { data: { id } });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      toast.success("Todo deleted successfully.");
    } catch (error) {
      console.error(error, "delete error");
      toast.error("Failed to delete todo.");
    }
  };

  // UPDATE TODO STATUS API
  const handleUpdateCompleted = async (id: number, completed: boolean) => {
    try {
      await api.post("/api/todos/todo", {
        id,
        isDone: completed,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isDone: completed } : todo
        )
      );

      toast.success("Todo status updated successfully.");
    } catch (error) {
      console.error(error, "update error");
      toast.error("Failed to update todo status.");
    }
  };
  console.log(todos);
  return (
    <div>
      <Header />
      <div className="mt-5 flex justify-center items-center gap-5">
        <h1 className="text-center justify-self-center text-2xl font-bold text-white py-3">
          Todolist
        </h1>
        <Link to={"/addtodo"}>
          <Button variant={"outline"}>Add</Button>
        </Link>
      </div>
      <div className=" flex justify-center flex-col gap-2 pt-3">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo.id} className="flex justify-center">
              <TodoItem
                title={todo.title}
                description={todo.content}
                id={todo.id}
                completed={todo.isDone}
                onDelete={handleDeleteTodo}
                updateStatus={handleUpdateCompleted}
              />
            </div>
          ))
        ) : (
          <div className="text-white text-center">No todo found.</div>
        )}
        <Toaster />
      </div>
    </div>
  );
}

export default TodoList;
