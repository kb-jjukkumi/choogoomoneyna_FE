// axios 라이브러리 불러오기 -> 커스텀 인스턴스 만들기
import axiosInstance from './axios';

// Codef - 계좌 연동 & 목록 불러오기
export const fetchAccountsFromCodef = async ({
  bankId,
  userBankId,
  userBankPassword,
}) => {
  try {
    const { data } = await axiosInstance.post('/api/codef/account/add', {
      bankId,
      userBankId,
      userBankPassword,
    });
    return data;
  } catch (e) {
    console.error('계좌 연동 실패: ', e);
    throw new Error('계좌 연동 실패');
  }
};
