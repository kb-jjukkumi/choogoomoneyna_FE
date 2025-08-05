import axiosInstance from './axios';

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
