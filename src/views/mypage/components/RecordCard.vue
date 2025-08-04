<template>
  <button
    class="flex flex-col py-1 justify-center items-center bg-white border-3 border-limegreen-500 rounded-[10px] shadow"
  >
    <div class="text-limegreen-800 text-sm mt-1 whitespace-pre-line">
      {{ formattedDateRange }}
    </div>
    <div class="flex my-1 mx-3 justify-center items-center">
      <img class="h-[80%]" :src="choogoomiImage" alt="" />
    </div>
    <div class="text-limegreen-800 text-normal">{{ ranking }}위</div>
    <div class="text-gray-300 text-sm my-1">{{ score }}점</div>
  </button>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';

import { CHOOGOOMI_MAP } from '@/constants/choogoomiMap';

const { choogoomiImage, roundNumber, startDate, ranking, score } = defineProps({
  choogoomiImage: { type: String, required: true },
  roundNumber: { type: Number, required: true },
  startDate: { type: Number, required: true },
  ranking: { type: Number, required: true },
  score: { type: Number, required: true },
});

// 날짜 포맷 계산
const formattedDateRange = computed(() => {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // 7일간 범위

  const format = date =>
    `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;

  return `${format(start)} \n~ ${format(end)}`;
});
</script>
