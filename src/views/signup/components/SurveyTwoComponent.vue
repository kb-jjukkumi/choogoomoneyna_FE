<template>
  <div class="flex justify-center w-full">
    <div class="bg-ivory flex flex-col gap-6 w-full px-6">
      <div class="flex flex-col text-center gap-2">
        <div class="font-bold text-2xl justify-center">사전 조사</div>
        <div class="text-limegreen-700 text-sm">
          추구 유형 추천을 위한 질문입니다.
        </div>
      </div>

      <div class="text-center py-20">
        <p class="text-lg text-limegreen-900 mb-4">설문조사 2 (임시)</p>
        <div class="flex flex-col gap-4">
          <button
            @click="handleNext"
            class="bg-limegreen-500 text-white px-6 py-3 rounded-lg"
          >
            자산 연동하기
          </button>
          <button
            @click="handleSkip"
            class="bg-transparent border-2 border-limegreen-500 text-limegreen-700 px-6 py-3 rounded-lg"
          >
            자산 연동 스킵
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  signupData: { type: Object, required: true },
  survey1Data: { type: Object, required: true },
});

const emit = defineEmits(['next', 'skip']);

const handleNext = () => {
  emit('next');
};

const handleSkip = () => {
  emit('skip');
};
</script>
