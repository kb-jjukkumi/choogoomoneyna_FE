<template>
  <div class="flex justify-center w-full">
    <div class="bg-ivory flex flex-col gap-6 w-full px-6 justify-between">
      <!-- 타이틀 -->
      <div class="flex flex-col text-center gap-2">
        <div class="tfont-bold text-2xl justify-center">사전 조사</div>
        <div class="text-limegreen-700 text-sm">
          추구 유형 추천을 위한 질문입니다.
        </div>
      </div>

      <!-- Progress Bar -->
      <div>
        <div class="w-full h-2 bg-limegreen-100 rounded-full">
          <div
            class="h-full bg-green rounded-full transition-all"
            :style="{
              width: `${((currentIndex + 1) / questionList.length) * 100}%`,
            }"
          ></div>
        </div>
        <div class="flex items-center text-xs mt-1 text-limegreen-700">
          <div class="text-sm text-green">
            {{ currentIndex + 1 }}
          </div>
          <div class="px-1">/ {{ questionList.length }}</div>
        </div>
      </div>

      <!-- 질문 카드 컴포넌트 -->
      <QuestionCard
        :question="currentQuestion"
        :selectedOption="selectedOption"
        @select="val => (selectedOption = val)"
      />

      <!-- 다음 버튼 -->
      <button
        @click="handleNext"
        class="w-full bg-limegreen-500 text-white text-lg py-4 rounded-lg disabled:opacity-50"
        :disabled="isProcessing"
      >
        {{
          isProcessing
            ? '처리 중...'
            : currentIndex === questionList.length - 1
              ? '자산 연동'
              : '다음'
        }}
      </button>

      <button
        v-if="currentIndex === questionList.length - 1"
        class="w-full bg-limegreen-500 text-white text-lg py-4 rounded-lg disabled:opacity-50"
        @click="handleSkip"
      >
        자산 연동 스킵
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
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import AlertModal from '@/components/AlertModal.vue';

import QuestionCard from './components/QuestionCard.vue';
import { INITIAL_QUESTION_LIST } from './constants/question';

const router = useRouter();

// 이전 페이지에서 전달받은 데이터
const signupData = ref(null);
const survey1Data = ref(null);

const currentIndex = ref(0);
const selectedOption = ref(null);
const showModal = ref(false);

// 로딩 상태 관리
const isProcessing = ref(false);

// survey2 답변들을 저장할 배열
const survey2Answers = ref([]);

const currentQuestion = computed(() => questionList[currentIndex.value]);

onMounted(() => {
  // SurveyView1에서 전달받은 데이터 확인
  if (history.state && history.state.signupData && history.state.survey1Data) {
    signupData.value = history.state.signupData;
    survey1Data.value = history.state.survey1Data;
    console.log('전달받은 회원가입 데이터:', signupData.value);
    console.log('전달받은 Survey1 데이터:', survey1Data.value);
  }
});

const handleNext = () => {
  if (isProcessing.value) return; // 중복 클릭 방지

  if (!selectedOption.value) {
    showModal.value = true;
    return;
  }

  console.log('선택:', selectedOption.value);

  // 현재 질문의 답변을 저장
  survey2Answers.value[currentIndex.value] = selectedOption.value;

  if (currentIndex.value < questionList.length - 1) {
    currentIndex.value++;
    selectedOption.value = null;
  } else {
    isProcessing.value = true;
    console.log('설문 완료');
    console.log('Survey2 답변:', survey2Answers.value);

    // 모든 데이터를 합쳐서 AssetSelectView로 전달
    const allData = {
      signupData: signupData.value,
      survey1Data: survey1Data.value,
      survey2Data: survey2Answers.value,
    };

    router.push({
      name: 'assetSelect',
      state: { allData },
    });
  }
};

const handleSkip = () => {
  const allData = {
    signupData: signupData.value,
    survey1Data: survey1Data.value,
    survey2Data: survey2Answers.value,
  };
  console.log('자산 연동 스킵 데이터:', allData);
};
</script>
