import AddTodo from './pages/AddTodo';
import TodoList from './pages/TodoList';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="h-screen bg-neutral-900">
      <Routes>
        <Route path="/addtodo" element={<AddTodo />} />
        <Route path="/" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
