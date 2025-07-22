import { defineStore } from 'pinia';

export const useMemberStore = defineStore('member', {
  state: () => ({
    member: {
      email: '',
      password: '',
      nickname: '',
      profileImage: null,
      choogooMi: null,
    },
  }),
  actions: {
    setMember(data) {
      this.member = { ...this.member, ...data };
    },
  },
});
