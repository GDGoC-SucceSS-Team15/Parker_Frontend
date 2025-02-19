import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}`,
});

// 요청을 보낼 때마다 최신 accessToken을 헤더에 추가
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
