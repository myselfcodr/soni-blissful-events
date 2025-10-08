import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env && import.meta.env.VITE_API_BASE_URL
      ? import.meta.env.VITE_API_BASE_URL
      : (process.env.NODE_ENV === "development"
          ? "http://localhost:5000"
          : "https://soni-blissful-events-backend.onrender.com"),
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
