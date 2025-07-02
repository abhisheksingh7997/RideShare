// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", //  Set your backend API root here
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
