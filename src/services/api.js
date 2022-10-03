import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/v1",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
  }
);

export default api;
