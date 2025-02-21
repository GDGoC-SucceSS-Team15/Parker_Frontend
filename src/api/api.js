import axios from "axios";
import { loadingStore } from "../store/loadingStore";

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

    const includedUrls = [
      "/api/report/my",
      "/api/report",
      "/api/bookmark/parking-space-list",
      "/api/parker/parking-space/nearby",
      "/api/parking-violation/nearby",
    ]; // 로딩을 부여할 요청만 포함

    const shouldShowLoading = includedUrls.includes(config.url); // 해당 URL이 로딩 포함 목록에 있는지 확인

    if (shouldShowLoading) {
      const { startLoading } = loadingStore.getState();
      startLoading();
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    const { stopLoading } = loadingStore.getState(); // Zustand에서 stopLoading 함수 가져오기
    stopLoading(); // API 호출 성공 시 로딩 상태 감소
    return response;
  },
  (error) => {
    const { stopLoading } = loadingStore.getState(); // Zustand에서 stopLoading 함수 가져오기
    stopLoading(); // API 호출 실패 시 로딩 상태 감소);
    return Promise.reject(error);
  }
);
export default api;
