// axios 라이브러리 불러오기 -> 커스텀 인스턴스 만들기
import axiosInstance from './axios';

// 매칭 메인 정보
export const fetchMatchingData = async () => {
  try {
    const response = await axiosInstance.get('/api/matching/main');
    return response.data;
  } catch (error) {
    console.error('매칭 메인 정보 불러오기 실패:', error);
    throw error;
  }
};

//roundNumber로 매칭 상세 기록 가져오기
export const getResultByRound = async roundNumber => {
  try {
    const { data } = await axiosInstance.get(
      `/api/matching/history?roundNumber=${roundNumber}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

//매칭결과 히스토리 가져오기 (n승 n무 n패 표시용)
export const getMatchingHistory = async () => {
  try {
    const { data } = await axiosInstance.get(
      '/api/users/matching/result/history'
    );
    return data;
  } catch {
    throw new Error('매칭결과 히스토리 가져오기 실패');
  }
};
