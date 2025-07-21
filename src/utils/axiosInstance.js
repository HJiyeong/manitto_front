import axios from "axios";
import url from "./backend";
import { Navigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: url,
});

// 요청 시 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답에서 401 에러 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("401 에러 발생! 토큰 삭제하고 로그아웃합니다.");
      localStorage.removeItem("accessToken");
      window.location.href = "/"; // 로그인 페이지로 이동
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
