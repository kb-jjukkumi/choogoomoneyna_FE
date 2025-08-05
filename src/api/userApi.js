import axiosInstance from './axios';

export const updateChoogooMi = async choogooMi => {
  try {
    await axiosInstance.put('api/choogoomi/update', {
      choogooMi: choogooMi,
    });
  } catch {
    throw new Error('추구미 선택 실패');
  }
};
