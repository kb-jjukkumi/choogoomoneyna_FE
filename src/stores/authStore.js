import { defineStore } from 'pinia';

import authApi from '@/api/authApi';

export const useAuthStore = defineStore('auth', {
  // 저장소 상태 정의
  state: () => ({
    accessToken: null,
    refreshToken: null,
  }),
  // 저장소 액션 정의
  actions: {
    // 액세스 토큰 설정
    setAccessToken(token) {
      this.accessToken = token;
    },
    // 리프레시 토큰 설정
    setRefreshToken(token) {
      this.refreshToken = token;
    },
    // 인증 정보 초기화
    clearAuth() {
      this.accessToken = null;
      this.refreshToken = null;
    },
    // 로그인
    async login(email, password) {
      try {
        const response = await authApi.login(email, password);

        this.setAccessToken(response.accessToken);
        this.setRefreshToken(response.refreshToken);
        return true;
      } catch {
        return false;
      }
    },
  },
});
