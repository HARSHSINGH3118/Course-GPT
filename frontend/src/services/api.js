// frontend/src/services/api.js
import axios from "axios";

// 1) Create an axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 2) Attach the JWT on every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// 3) Export exactly these named functions:
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);

export const fetchCourses = () => API.get("/courses");
export const createCourse = (data) => API.post("/courses", data);
export const updateCourse = (id, data) => API.put(`/courses/${id}`, data);

export const fetchTemplates = () => API.get("/templates");
export const generateContent = (body) => API.post("/templates/generate", body);
