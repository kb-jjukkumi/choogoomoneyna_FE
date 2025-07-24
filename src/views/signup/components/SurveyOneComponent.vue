<template>
  <div class="flex justify-center w-full">
    <div class="bg-ivory flex flex-col gap-6 w-full px-6">
      <div class="flex flex-col text-center gap-2">
        <div class="font-bold text-2xl justify-center">사전 조사</div>
        <div class="text-limegreen-700 text-sm">
          현재 자산 유형 분석을 위한 질문입니다.
        </div>
      </div>

      <div class="text-center py-20">
        <p class="text-lg text-limegreen-900 mb-4">설문조사 1 (임시)</p>
        <button
          @click="handleNext"
          class="bg-limegreen-500 text-white px-6 py-3 rounded-lg"
        >
          다음으로 (임시)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  signupData: { type: Object, required: true },
});

const emit = defineEmits(['next']);

const handleNext = () => {
  // 임시 데이터
  const survey1Data = {
    age: 1,
    income: 2,
    save: 3,
    habit: 4,
  };
  emit('next', survey1Data);
};
</script>
