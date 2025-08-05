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

export const submitSurvey = async surveyAnswers => {
  try {
    const response = await axiosInstance.post(
      'api/survey/submit',
      surveyAnswers
    );
    return response.data;
  } catch {
    throw new Error('설문 제출 실패');
  }
};
