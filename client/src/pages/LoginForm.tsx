import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useUserStore from "../store/UserStore.ts";

export default function LoginForm() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const { login } = useUserStore();

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        [name]: value,
      };
    });
  }

  const navigate = useNavigate();

  const header = {
    "Content-Type": "application/json",
    Authorization: "Bearer your-access-token",
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await axios.post(
        "/api/users/auth",
        {
          email: inputData.email,
          password: inputData.password,
        },
        { headers: header }
      );
      if (res.status === 201) {
        login(res.data);
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }

    console.log(inputData);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="border p-5 rounded-md"
      >
        <h1 className="text-white text-center py-2 text-lg">Login Form</h1>
        <label htmlFor="email"></label>
        <input
          name="email"
          className="p-2 block mt-2 rounded-md w-64"
          type="email"
          id="email"
          placeholder="Email"
          onChange={handleInput}
          value={inputData.email}
          required
        />
        <label htmlFor="password"></label>
        <input
          name="password"
          className="p-2 block mt-2 rounded-md w-64"
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleInput}
          value={inputData.password}
          required
        />
        <div className="flex justify-center my-2">
          <button className="bg-blue-500 py-2 px-5 text-white mt-2 rounded-md hover:bg-blue-900">
            Login
          </button>
        </div>
        <Link to={"/signup"} className="text-white focus:outline-none">
          Don't have an account?{" "}
          <span className="text-blue-500 hover:text-blue-900">Signup</span>
        </Link>
      </form>
      <Toaster />
    </div>
  );
}
