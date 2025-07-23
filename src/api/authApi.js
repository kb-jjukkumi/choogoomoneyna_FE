import axiosInstance from './axios';

const checkName = async name => {
  try {
    const { data } = await axiosInstance.get(`api/users/check-nickname`, {
      params: {
        nickname: name,
      },
    });
    return data;
  } catch {
    throw new Error('이름 중복 체크 실패');
  }
};

//이메일로 인증코드 전송
const sendCode = async email => {
  try {
    const { data } = await axiosInstance.post('api/email-auth/send', email);
    return data;
  } catch {
    throw new Error('이메일 전송 실패');
  }
};

//인증코드 검증
const verifyCode = async verifyEmail => {
  try {
    const { data } = await axiosInstance.post(
      'api/email-auth/verify',
      verifyEmail
    );
    return data;
  } catch {
    throw new Error('인증코드 검증 실패');
  }
};

//회원가입
const signup = async signupData => {
  try {
    const { data } = await axiosInstance.post('api/users/signup', signupData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(data);
    return data;
  } catch {
    throw new Error('회원가입 실패');
  }
};

export default { checkName, sendCode, verifyCode, signup };
