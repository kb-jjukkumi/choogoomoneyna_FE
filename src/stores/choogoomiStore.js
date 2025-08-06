import { defineStore } from 'pinia';

export const useChoogoomiStore = defineStore('choogoomi', {
  state: () => ({
    choogoomiType: '',
  }),
  actions: {
    setChoogoomiType(type) {
      this.choogoomiType = type;
    },
  },
});
