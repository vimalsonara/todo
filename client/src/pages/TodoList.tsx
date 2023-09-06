import { useEffect, useState } from 'react';
import TodoItem from '@/components/TodoItem';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface Todo {
  _id: string;
  todo: string;
  description: string;
  completed: boolean;
  onDelete: (id: string) => void;
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

  return (
    <div className=" flex justify-center flex-col gap-2 pt-3">
      {todos.length > 0
        ? todos.map((todo) => (
            <div key={todo._id} className="flex justify-center">
              <TodoItem
                title={todo.todo}
                description={todo.description}
                id={todo._id}
                onDelete={handleDeleteTodo}
              />
            </div>
          ))
        : 'No todo'}
      <Toaster />
    </div>
  );
}

export default TodoList;
