// axios 라이브러리 불러오기 -> 커스텀 인스턴스 만들기
import axiosInstance from './axios';

// 계좌 목록 조회
export const fetchAccounts = async () => {
  try {
    const response = await axiosInstance.get('/account/db');
    return response.data;
  } catch (error) {
    console.error('계좌 목록 불러오기 실패:', error);
    throw error; // 필요 시 상위 컴포넌트에서 catch 처리
  }
};

// 거래 내역 조회
export const fetchTransactions = async accountNum => {
  try {
    const { data } = await axiosInstance.get(
      `/transaction/db?account=${accountNum}`
    );
    return data;
  } catch (e) {
    console.error('거래내역 조회 실패: ', e);
    throw new Error('거래내역 조회 실패');
  }
};
