import { useEffect, useState } from 'react';
import TodoItem from '@/components/TodoItem';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Todo {
  _id: string;
  todo: string;
  description: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const APIURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await axios.get(APIURL + 'todos');
        setTodos(response.data.todos);
      } catch (error) {
        console.log(error);
      }
    }
    getTodos();
  }, []);

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(APIURL + id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      toast.success('Todo deleted successfully.');
    } catch (error) {
      console.error(error, 'delete error');
      toast.error('Failed to delete todo.');
    }
  };

  const handleUpdateCompleted = async (id: string, completed: boolean) => {
    try {
      await axios.put(APIURL + id, { completed });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed } : todo
        )
      );

      toast.success('Todo status updated successfully.');
    } catch (error) {
      console.error(error, 'update error');
      toast.error('Failed to update todo status.');
    }
  };

  return (
    <div>
      <div className=" flex justify-center items-center gap-5">
        <h1 className="text-center justify-self-center text-2xl font-bold text-white py-3">
          Todolist
        </h1>
        <Link to={'/addtodo'}>
          <Button variant={'outline'}>Add</Button>
        </Link>
      </div>
      <div className=" flex justify-center flex-col gap-2 pt-3">
        {todos.length > 0
          ? todos.map((todo) => (
              <div key={todo._id} className="flex justify-center">
                <TodoItem
                  title={todo.todo}
                  description={todo.description}
                  id={todo._id}
                  onDelete={handleDeleteTodo}
                  updateStatus={handleUpdateCompleted}
                />
              </div>
            ))
          : 'No todo'}
        <Toaster />
      </div>
    </div>
  );
}

export default TodoList;
