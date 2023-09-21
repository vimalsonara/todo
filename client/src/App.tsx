import AddTodo from "./pages/AddTodo";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import TodoList from "./pages/TodoList";
import PriavateRoute from "./components/PriavateRoute";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="h-screen bg-neutral-900">
      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="" element={<PriavateRoute />}>
          <Route path="/" element={<TodoList />} />
          <Route path="addtodo" element={<AddTodo />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
