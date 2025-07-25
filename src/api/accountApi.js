// 공통으로 설정된 axios 객체: 요청 헤더에 자동으로 token 붙여줌
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
