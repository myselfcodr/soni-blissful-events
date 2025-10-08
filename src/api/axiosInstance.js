import axios from "axios";

let baseURL = "";
if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE_URL) {
  baseURL = import.meta.env.VITE_API_BASE_URL;
} else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:5000";
} else {
  baseURL = "https://soni-blissful-events-backend.onrender.com";
}

const api = axios.create({ baseURL });

// Request interceptor to add JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
