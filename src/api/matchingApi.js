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

// 글쓰기 미션 인증 요청
export const validateWriteMission = async missionId => {
  try {
    const response = await axiosInstance.put(
      `/api/matching/missions/validate/3`,
      { missionId }
    );
    return response.data;
  } catch (error) {
    console.error('미션 인증 요청 실패:', error);
    throw error;
  }
};

// 퀴즈 미션 인증 요청
export const validateQuizMission = async (missionId, score) => {
  try {
    const response = await axiosInstance.put(
      '/api/matching/missions/validate/4',
      { missionId, score }
    );
    return response.data;
  } catch (error) {
    console.error('퀴즈 미션 인증 요청 실패:', error);
    throw error;
  }
};
