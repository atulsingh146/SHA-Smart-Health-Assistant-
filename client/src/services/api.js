import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  timeout: 20000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }

    const message =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  },
);

export default api;
