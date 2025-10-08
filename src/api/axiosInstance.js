import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000", // Use local backend for development
  baseURL: "https://soni-blissful-events-backend.onrender.com", // Use for production
});

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
