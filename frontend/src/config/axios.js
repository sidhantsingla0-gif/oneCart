import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // your backend URL
  withCredentials: true
});

export default instance;