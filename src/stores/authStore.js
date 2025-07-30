import { defineStore } from 'pinia';

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
  },
});
