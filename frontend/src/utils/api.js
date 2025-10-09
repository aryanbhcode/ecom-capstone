import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get latest token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // attach token
  }
  return config;
});

export default API;
