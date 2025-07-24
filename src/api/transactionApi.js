import axiosInstance from './axios';

export const fetchTransactions = async accountNum => {
  const response = await axiosInstance.get('/transaction/db', {
    params: {
      account: accountNum,
    },
  });
  return response.data;
};
