import AddTodo from "./pages/AddTodo";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import TodoList from "./pages/TodoList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="h-screen bg-neutral-900">
      <Routes>
        <Route path="addtodo" element={<AddTodo />} />
        <Route path="/" element={<TodoList />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;
