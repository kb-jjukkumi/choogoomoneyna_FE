<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/70 z-20">
    <div
      class="bg-ivory rounded-4xl pt-10 pb-8 w-[40vh] flex flex-col items-center shadow-lg"
    >
      <div class="mb-4"></div>
      <div class="text-limegreen-900 text-2xl font-jua mb-2">{{ title }}</div>
      <div class="text-gray-400 text-base mb-10 text-center">
        {{ '미션 : ' + message }}
      </div>
      <button
        class="w-36 h-12 bg-limegreen-500 text-limegreen-900 rounded-lg py-2 text-lg font-bold"
        @click="$emit('close')"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '알림' },
  message: { type: String, required: true },
  buttonText: { type: String, default: '확인' },
});
</script>
