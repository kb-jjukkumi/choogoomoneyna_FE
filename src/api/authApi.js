import api from 'axios';

const BASE_URL = '/api/users';

export default {
  //name 중복체크
  async checkName(name) {
    const { data } = await api.get(
      `${BASE_URL}/check-nickname?nickname=${name}`
    );
    console.log('Check Nickname', data);
    return data;
  },

  //이메일로 인증코드 전송
  async sendCode(email) {
    const { data } = await api.post('api/email-auth/send', email);
    console.log('Send Email', data);
    return data;
  },

  //인증코드 검증
  async verifyCode(verifyEmail) {
    const { data } = await api.post('api/email-auth/verify', verifyEmail);
    console.log('verify Email', data);
    return data;
  },
};
