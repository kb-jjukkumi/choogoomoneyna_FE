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
            : currentIndex === QUESTION_LIST.length - 1
              ? '자산 연동'
              : '다음'
        }}
      </button>

      <button
        v-if="currentIndex === QUESTION_LIST.length - 1"
        class="w-full bg-limegreen-500 text-white text-lg py-4 rounded-lg disabled:opacity-50"
        @click="handleSkip"
        :disabled="isProcessing"
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

      <!-- 회원가입 에러 모달 -->
      <AlertModal
        v-if="showErrorModal"
        title="오류"
        message="회원가입 중 문제가 발생했습니다. 다시 시도해주세요."
        buttonText="확인"
        @close="handleErrorClose"
      />

      <!-- 회원가입 성공 모달 -->
      <AlertModal
        v-if="showSuccessModal"
        title="회원가입 완료"
        message="회원가입이 완료되었습니다."
        buttonText="확인"
        @close="handleSuccessClose"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import authApi from '@/api/authApi';
import AlertModal from '@/components/AlertModal.vue';

import { QUESTION_LIST } from '../../constants/question';
import QuestionCard from './QuestionCard.vue';

const router = useRouter();

// Props 정의
const props = defineProps({
  signupData: { type: Object, required: true },
});

// Emit 정의
const emit = defineEmits(['next', 'skip', 'error']);

const currentIndex = ref(0);
const selectedOption = ref(null);
const showModal = ref(false);
const showErrorModal = ref(false);
const showSuccessModal = ref(false);

// 로딩 상태 관리
const isProcessing = ref(false);

// survey2 답변들을 저장할 배열
const survey2Answers = ref([]);

const currentQuestion = computed(() => QUESTION_LIST[currentIndex.value]);

const handleNext = async () => {
  if (!selectedOption.value) {
    showModal.value = true;
    return;
  }

  // 현재 질문의 답변을 저장
  survey2Answers.value[currentIndex.value] = selectedOption.value;

  if (currentIndex.value < QUESTION_LIST.length - 1) {
    currentIndex.value++;
    selectedOption.value = null;
  } else {
    console.log('Survey2 답변:', survey2Answers.value);

    console.log('props.signupData', props.signupData);

    // 마지막 질문에서 회원가입 API 호출
    isProcessing.value = true;
    try {
      // 회원가입 API 호출
      console.log('props.signupData', props.signupData);
      await authApi.signup(props.signupData);

      // 회원가입 성공 시 성공 모달 표시
      showSuccessModal.value = true;
    } catch (error) {
      console.error('회원가입 실패:', error);
      // 에러 처리 - 에러 모달 표시
      showErrorModal.value = true;
    } finally {
      isProcessing.value = false;
    }
  }
};

const handleSkip = async () => {
  console.log('⏭️ 자산 연동 스킵 - Survey2 답변:', survey2Answers.value);

  // 자산 연동 스킵 시에도 회원가입 API 호출
  isProcessing.value = true;

  try {
    // 최종 회원가입 데이터 구성 (누적된 모든 데이터 포함)
    const finalSignupData = {
      ...props.signupData,
      // survey 데이터도 필요하면 추가
      // survey1: props.allData.survey1Data,
      // survey2: survey2Answers.value,
    };

    console.log('회원가입 데이터 (스킵):', finalSignupData);

    // 회원가입 API 호출
    await authApi.signup(finalSignupData);

    // 회원가입 성공 시 성공 모달 표시
    showSuccessModal.value = true;
  } catch (error) {
    console.error('회원가입 실패:', error);
    // 에러 처리 - 에러 모달 표시
    showErrorModal.value = true;
  } finally {
    isProcessing.value = false;
  }
};

const handleErrorClose = () => {
  showErrorModal.value = false;
  emit('error');
};

const handleSuccessClose = () => {
  showSuccessModal.value = false;
  emit('next');
};
</script>
