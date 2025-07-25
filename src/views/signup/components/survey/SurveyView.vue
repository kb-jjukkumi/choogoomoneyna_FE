<template>
  <div class="min-h-screen bg-ivory">
    <!-- 설문 1 -->
    <SurveyOneComponent
      v-if="currentStep === 1"
      @next="handleSurveyOneComplete"
    />

    <!-- 설문 2 -->
    <SurveyTwoComponent
      v-if="currentStep === 2"
      @next="handleSurveyTwoComplete"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import SurveyOneComponent from './SurveyOneComponent.vue';
import SurveyTwoComponent from './SurveyTwoComponent.vue';

// 현재 설문 단계 (1: 첫 번째 설문, 2: 두 번째 설문)
const currentStep = ref(1);

// 설문 데이터를 저장할 배열 [[설문1 데이터들...], [설문2 데이터들...]]
const surveyData = ref([null, null]);

// 설문 1 완료 처리
const handleSurveyOneComplete = surveyOneAnswers => {
  // 설문 1 답변을 배열 형태로 변환 (객체의 값들을 배열로)
  const surveyOneArray = Object.values(surveyOneAnswers);
  surveyData.value[0] = surveyOneArray;
  // 다음 설문으로 이동
  currentStep.value = 2;
};

// 설문 2 완료 처리
const handleSurveyTwoComplete = surveyTwoAnswers => {
  // 설문 2 답변 저장
  surveyData.value[1] = surveyTwoAnswers;
  // 최종 설문 데이터 출력
  console.log('전체 설문 완료:', surveyData.value);
};
</script>
