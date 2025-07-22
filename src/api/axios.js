import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

// 요청 인터셉터: 토큰이 있으면 자동으로 헤더에 추가
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    // token이 있으면 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
