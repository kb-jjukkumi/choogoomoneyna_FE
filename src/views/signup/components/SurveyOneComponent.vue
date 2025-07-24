<template>
  <div class="flex justify-center w-full">
    <div class="bg-ivory flex flex-col gap-6 w-full px-6">
      <!-- 타이틀 -->
      <div class="flex flex-col text-center gap-2">
        <div class="tfont-bold text-2xl justify-center">사전 조사</div>
        <div class="text-limegreen-700 text-sm">
          현재 자산 유형 분석을 위한 질문입니다.
        </div>
      </div>

      <!-- 설문조사 문항 -->
      <div class="flex flex-col gap-5">
        <div
          v-for="question in INITIAL_QUESTION_LIST"
          :key="question.id"
          class="flex flex-col gap-3 bg-ivory rounded-lg"
        >
          <!-- 질문 제목 -->
          <div
            class="px-3 py-1 rounded-lg flex bg-limegreen-100 justify-between items-center"
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

          <div class="relative">
            <div
              class="absolute top-3 left-6 right-6 h-0.5 bg-limegreen-500 z-0"
            ></div>

            <!-- 설문조사 응답 버튼과 라벨 -->
            <div class="grid grid-cols-5 gap-0 relative z-10">
              <div v-for="(option, index) in question.options" :key="index">
                <!-- 각 옵션을 컨테이너로 묶기 -->
                <div class="flex flex-col items-center">
                  <div
                    @click="selectOption(question.id, option.value)"
                    :class="[
                      'w-6 h-6 rounded-full border-2 text-gray-300 border-limegreen-500 flex items-center justify-center text-xs cursor-pointer ',
                      answers[question.id] === option.value
                        ? 'bg-limegreen-100'
                        : 'bg-white hover:bg-limegreen-100',
                    ]"
                  >
                    {{ index + 1 }}
                  </div>
                  <!-- 라벨 -->
                  <div
                    class="text-xs text-center text-gray-300 mt-1 whitespace-pre-line"
                  >
                    {{ option.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 다음 버튼 -->
      <button
        @click="handleNext"
        class="w-full bg-limegreen-500 text-white text-lg py-4 rounded-lg"
      >
        다음
      </button>

      <!--선택하지 않은 항목이 있을 때 모달 -->
      <AlertModal
        v-if="showModal"
        title="알림"
        message="모든 항목에 응답해주세요."
        buttonText="확인"
        @close="showModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

import AlertModal from '@/components/AlertModal.vue';

import { INITIAL_QUESTION_LIST } from '../constants/question';

// Props 정의
const props = defineProps({
  allData: { type: Object, required: true },
});

const emit = defineEmits(['next']);

// 전달받은 누적 데이터 확인
console.log('📋 Survey1에서 받은 누적 데이터:', props.allData);

// 답변
const answers = reactive({
  age: null,
  income: null,
  save: null,
  habit: null,
});

// 모달 상태
const showModal = ref(false);

// 응답 선택
function selectOption(questionId, value) {
  answers[questionId] = value;
}

// 다음 버튼 클릭 시
function handleNext() {
  //answers의 value들을 배열에 담아 값이 null이 아닌지(모든 항목이 선택되었는지) 확인
  const isAllAnswered = Object.values(answers).every(value => value !== null);
  if (!isAllAnswered) {
    showModal.value = true;
    return;
  }

  console.log('Survey1 답변:');
  emit('next', answers);
}
</script>
