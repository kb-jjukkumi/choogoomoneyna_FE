import { defineStore } from 'pinia';

import { updateChoogooMi } from '@/api/userApi';

const CHOOGOOMI_TYPE = {
  A: '지출제로형',
  B: '합리소비형',
  C: '저축실천형',
  D: '투자도전형',
  E: '금융탐구형',
};

export const useChoogoomiStore = defineStore('choogoomi', {
  state: () => ({
    choogoomiType: '',
  }),
  actions: {
    async setChoogoomiType(type) {
      try {
        await updateChoogooMi(type);
        this.choogoomiType = CHOOGOOMI_TYPE[type];
        localStorage.setItem('choogoomiType', this.choogoomiType);
      } catch (error) {
        console.error('추구미 선택 실패:', error);
      }
    },
  },
});
