import axiosInstance from '@/api/axios';

export const fetchRankingList = async () => {
  try {
    const response = await axiosInstance.get('/api/ranking/list/top50');
    return response.data;
  } catch {
    return false;
  }
};

export const fetchLastRankingList = async () => {
  try {
    const response = await axiosInstance.get('/api/ranking/list/previous/top3');
    return response.data;
  } catch {
    return false;
  }
};
