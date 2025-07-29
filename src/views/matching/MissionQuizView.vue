<template>
  <TopNavigation :showBack="true" :showLogoText="false" />
  <div class="relative flex justify-center w-full">
    <div class="bg-ivory flex flex-col gap-6 w-full mt-10 px-6 justify-between">
      <!-- 타이틀 -->
      <div class="flex flex-col text-center gap-2">
        <div class="tfont-bold text-2xl justify-center">투자도전형 QUIZ</div>
        <div class="text-limegreen-700 text-sm">
          5문제 중 3문제 이상 맞혀야 미션 성공입니다.
        </div>
      </div>

      <!-- Progress Bar -->
      <div>
        <div class="w-full h-2 bg-limegreen-100 rounded-full">
          <div
            class="h-full bg-green rounded-full transition-all"
            :style="{
              width: `${((currentIndex + 1) / QUESTION_LIST.length) * 100}%`,
            }"
          ></div>
        </div>
        <div class="flex items-center text-xs mt-1 text-limegreen-700">
          <div class="text-sm text-green">
            {{ currentIndex + 1 }}
          </div>
          <div class="px-1">/ {{ QUESTION_LIST.length }}</div>
        </div>
      </div>

      <!-- 질문 카드 컴포넌트 -->
      <QuizCard
        :question="currentQuestion"
        :selectedOption="selectedOption"
        @select="val => (selectedOption = val)"
      />

      <!-- 다음 버튼 -->
      <button
        @click="handleNext"
        class="w-full bg-limegreen-500 text-white text-lg py-4 rounded-lg"
      >
        {{ currentIndex === QUESTION_LIST.length - 1 ? '완료' : '선택' }}
      </button>

      <!--선택하지 않은 항목이 있을 때 모달 -->
      <AlertModal
        v-if="showModal"
        title="알림"
        message="질문에 응답해주세요."
        buttonText="확인"
        @close="showModal = false"
      />
    </div>
  </div>
  <BottomNavigation />
</template>

<script setup>
import { computed, ref } from 'vue';

import AlertModal from '@/components/AlertModal.vue';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';

import QuizCard from './components/QuizCard.vue';
import { QUESTION_LIST } from './questions';

const currentIndex = ref(0);
const selectedOption = ref(null);
const showModal = ref(false);

const currentQuestion = computed(() => QUESTION_LIST[currentIndex.value]);

const handleNext = () => {
  if (!selectedOption.value) {
    showModal.value = true;
    return;
  }

  console.log('선택:', selectedOption.value);

  if (currentIndex.value < QUESTION_LIST.length - 1) {
    currentIndex.value++;
    selectedOption.value = null;
  } else {
    console.log('퀴즈 완료');
  }
};
</script>
