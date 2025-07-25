<template>
  <div class="relative flex justify-center w-full">
    <TopNavigation :show-back="true" :show-logo-text="false" />
    <div class="bg-ivory flex flex-col gap-7 w-full px-6">
      <!-- 타이틀 -->
      <div class="flex font-bold text-xl justify-center h-14 items-center">
        역대 랭킹 기록
      </div>
      <!--랭킹 기록 영역-->
      <div class="flex flex-col items-center">
        <!--년도,최고순위-->
        <div class="flex flex-col items-center gap-5">
          <!--년도-->
          <div class="flex text-xl gap-4">
            <button
              class="bg-limegreen-100 w-7 h-7 rounded-[10px]"
              @click="past"
            >
              <img :src="back" alt="" />
            </button>
            <div>{{ year }}</div>
            <button
              class="bg-limegreen-100 w-7 h-7 rounded-[10px] disabled:opacity-50"
              @click="future"
              :disabled="currentYear === year"
            >
              <img :src="back" alt="" style="transform: scaleX(-1)" />
            </button>
          </div>
          <!--최고순위-->
          <div class="bg-limegreen-500 rounded-[10px] px-4 py-1.5 text-white">
            최고 순위 : 10위
          </div>
        </div>
        <!--월별 기록-->
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import back from '@/assets/img/icons/system/system_back.png';
import TopNavigation from '@/components/TopNavigation.vue';

const year = ref(2025);
const currentYear = ref(new Date().getFullYear());

const past = () => {
  year.value -= 1;
};

const future = () => {
  year.value += 1;
};
</script>
