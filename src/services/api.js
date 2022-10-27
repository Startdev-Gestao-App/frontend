import axios from "axios";

const api = axios.create({
  baseURL: "http://api-gestao.startdevjs.com.br/v1",
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
