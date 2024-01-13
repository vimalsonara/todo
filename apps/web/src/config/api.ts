import axios from "axios";

const MODE = import.meta.env.MODE;

const baseURL =
  MODE === "development"
    ? "http://localhost:5000/"
    : import.meta.env.VITE_PROD_URL;

let token;
const userData = localStorage.getItem("user");

if (userData) {
  token = JSON.parse(userData).token;
}

export const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
