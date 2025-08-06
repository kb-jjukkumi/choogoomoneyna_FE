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
    /* const { data } = await axiosInstance.get(
      '/api/users/matching/result/history'
    ); */

    //mock데이터 (실제 데이터가 생기면 삭제 후 api 호출 코드의 주석을 제거하면 됨)
    const data = [
      {
        roundNumber: 1,
        startDate: '2025-06-06T00:00:00.000+09:00',
        endDate: '2025-06-12T00:00:00.000+09:00',
        matchingResult: 'WIN',
      },
      {
        roundNumber: 2,
        startDate: '2025-06-13T00:00:00.000+09:00',
        endDate: '2025-06-19T00:00:00.000+09:00',
        matchingResult: 'LOSE',
      },
      {
        roundNumber: 3,
        startDate: '2025-06-20T00:00:00.000+09:00',
        endDate: '2025-06-26T00:00:00.000+09:00',
        matchingResult: 'DRAW',
      },
      {
        roundNumber: 4,
        startDate: '2025-06-27T00:00:00.000+09:00',
        endDate: '2025-07-03T00:00:00.000+09:00',
        matchingResult: 'WIN',
      },
      {
        roundNumber: 5,
        startDate: '2025-07-04T00:00:00.000+09:00',
        endDate: '2025-07-10T00:00:00.000+09:00',
        matchingResult: 'WIN',
      },
      {
        roundNumber: 6,
        startDate: '2025-07-11T00:00:00.000+09:00',
        endDate: '2025-07-17T00:00:00.000+09:00',
        matchingResult: 'LOSE',
      },
      {
        roundNumber: 7,
        startDate: '2025-07-18T00:00:00.000+09:00',
        endDate: '2025-07-24T00:00:00.000+09:00',
        matchingResult: 'WIN',
      },
      {
        roundNumber: 8,
        startDate: '2025-07-25T00:00:00.000+09:00',
        endDate: '2025-07-31T00:00:00.000+09:00',
        matchingResult: 'DRAW',
      },
      {
        roundNumber: 9,
        startDate: '2025-08-01T00:00:00.000+09:00',
        endDate: '2025-08-07T00:00:00.000+09:00',
        matchingResult: 'LOSE',
      },
      {
        roundNumber: 10,
        startDate: '2025-08-08T00:00:00.000+09:00',
        endDate: '2025-08-14T00:00:00.000+09:00',
        matchingResult: 'WIN',
      },
    ];

    return data;
  } catch {
    throw new Error('매칭결과 히스토리 가져오기 실패');
  }
};
