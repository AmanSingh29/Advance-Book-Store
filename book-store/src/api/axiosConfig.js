import axios, { HttpStatusCode } from "axios";
const url = import.meta.env.VITE_API_HOST;

const axiosInstanse = axios.create({
  baseURL: url,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanse.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstanse.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle specific status codes here
    if (
      error.response &&
      error.response.status === HttpStatusCode.Unauthorized
    ) {
      // Handle unauthorized access, e.g., redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstanse;
