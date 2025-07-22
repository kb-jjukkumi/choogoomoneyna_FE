<template>
  <div class="flex justify-center w-full">
    <div class="bg-ivory flex flex-col gap-7 w-full">
      <!-- 타이틀 -->
      <div class="text-center">
        <div class="tfont-bold text-2xl justify-center">사전 조사</div>
        <div class="text-limegreen-700 text-sm">
          현재 자산 유형 분석을 위한 질문입니다.
        </div>
      </div>

      <!-- 설문조사 문항 -->
      <div class="">
        <div
          v-for="question in questions"
          :key="question.id"
          class="bg-ivory rounded-lg p-6"
        >
          <!-- 질문 제목 -->
          <div
            class="mb-6 px-2 py-1.5 rounded-lg flex bg-limegreen-100 justify-between items-center"
          >
            <div class="flex items-center">
              <div class="font-thin text-sm text-limegreen-800">
                {{ question.title }}
              </div>
              <div
                v-if="question.subtitle"
                class="text-xs text-gray-300 font-thin px-1"
              >
                {{ question.subtitle }}
              </div>
            </div>
            <div v-if="question.priceUnit" class="text-xs text-gray-300">
              {{ question.priceUnit }}
            </div>
          </div>
        </div>
      </div>

      <!-- 다음 버튼 -->
      <div class="mt-8">
        <button class="w-full bg-limegreen-500 text-white py-4 rounded-lg">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

// 답변
const answers = reactive({
  age: null,
  income: null,
  save: null,
  habit: null,
});

// 모달 상태
const showModal = ref(false);

// 질문 데이터
const questions = [
  {
    id: 'age',
    title: '현재 직업 상태가 어떻게 되나요?',
    options: [
      { value: 1, label: '학생' },
      { value: 2, label: '취업\n준비중' },
      { value: 3, label: '직장인' },
      { value: 4, label: '프리랜서\n자영업' },
      { value: 5, label: '기타' },
    ],
  },
  {
    id: 'income',
    title: '월 평균 소득이 얼마인가요?',
    subtitle: '(세후 기준)',
    priceUnit: '(단위: 10,000원)',
    options: [
      { value: 1, label: '~200' },
      { value: 2, label: '200\n~300' },
      { value: 3, label: '300\n~400' },
      { value: 4, label: '400\n~500' },
      { value: 5, label: '500~' },
    ],
  },
  {
    id: 'save',
    title: '매월 저축을 얼마나 하나요?',
    subtitle: '(단위: 10,000원)',
    options: [
      { value: 1, label: '~5' },
      { value: 2, label: '5~15' },
      { value: 3, label: '15~30' },
      { value: 4, label: '30~50' },
      { value: 5, label: '50~' },
    ],
  },
  {
    id: 'habit',
    title: '평소 소비 습관은 어떤 편인가요?',
    options: [
      { value: 1, label: '절약적\n소비' },
      { value: 2, label: '타협적\n소비' },
      { value: 3, label: '합리적\n소비' },
      { value: 4, label: '감정적\n소비' },
      { value: 5, label: '즉흥적\n소비' },
    ],
  },
];
</script>
