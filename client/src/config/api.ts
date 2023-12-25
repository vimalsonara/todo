import axios from "axios";

const MODE = import.meta.env.MODE;

const baseURL =
  MODE === "development"
    ? import.meta.env.VITE_DEV_URL
    : import.meta.env.VITE_PROD_URL;

export const api = axios.create({
  baseURL,
});
