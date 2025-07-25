import axiosInstance from './axios';

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
