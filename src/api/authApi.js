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
};
