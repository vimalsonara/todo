import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupForm() {
  const [passwordError, setPasswordError] = useState("");
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputData.password !== inputData.confirmPassword) {
      setPasswordError("Both password must be same!");
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
        <h1 className="text-white text-center py-2 text-lg">
          Create an account
        </h1>
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
          className={
            passwordError
              ? "p-2 block mt-2 rounded-md w-64 border-2 border-red-500"
              : "p-2 block mt-2 rounded-md w-64"
          }
          type="password"
          id="password"
          placeholder="Password"
          minLength={8}
          onChange={handleInput}
          value={inputData.password}
          required
        />
        <label htmlFor="confirmPassword"></label>
        <input
          name="confirmPassword"
          className={
            passwordError
              ? "p-2 block mt-2 rounded-md w-64 border-2 border-red-500"
              : "p-2 block mt-2 rounded-md w-64"
          }
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          minLength={8}
          onChange={handleInput}
          value={inputData.confirmPassword}
          required
        />
        {passwordError && (
          <div className="mt-1 text-red-500">{passwordError}</div>
        )}
        <div className="flex justify-center my-2">
          <button className="bg-blue-500 py-2 px-5 text-white mt-2 rounded-md hover:bg-blue-900">
            Signup
          </button>
        </div>
        <Link to={"/login"} className="text-white focus:outline-none">
          Already user?{" "}
          <span className="text-blue-500 hover:text-blue-900">Login</span>
        </Link>
      </form>
    </div>
  );
}
