<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/70 z-20">
    <div
      class="flex flex-col gap-4 bg-limegreen-500 rounded-4xl p-5 items-center"
    >
      <!--지난주 매칭 결과-->
      <div class="flex flex-col gap-0.5 w-full mt-1">
        <div class="text-limegreen-900 text-lg">{{ title }}</div>
        <div class="bg-ivory flex rounded-2xl p-5">
          <div class="flex gap-6 text-sm text-center items-center">
            <div>
              <div class="text-limegreen-900">카카오대학교라이언</div>
              <div class="text-green">50점</div>
            </div>
            <div class="text-limegreen-900 text-lg">VS</div>
            <div>
              <div class="text-limegreen-900">카카오대학교어피치</div>
              <div class="text-green">20점</div>
            </div>
          </div>
        </div>
      </div>
      <!--미션 목록-->
      <div class="flex flex-col w-full gap-0.5">
        <div class="text-limegreen-900 text-lg">미션 목록</div>
        <div class="flex flex-col gap-2 text-sm">
          <MissionListCard />
          <MissionListCard />
        </div>
      </div>
      <button
        class="bg-ivory w-36 h-12 rounded-2xl text-limegreen-900"
        @click="$emit('close')"
      >
        확인
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import axiosInstance from '@/api/axios';

import MissionListCard from './MissionListCard.vue';

const props = defineProps({
  roundNumber: { type: Number, required: true },
  title: { type: String, required: true },
});

onMounted(async () => {
  try {
    const { data } = await axiosInstance.get(
      `/api/matching/history?roundNumber=${props.roundNumber}`
    );
    console.log(data);
  } catch {
    console.log(error);
  }
});
</script>
