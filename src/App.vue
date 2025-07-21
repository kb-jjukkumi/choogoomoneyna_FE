<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue';

import TopNavigation from './components/TopNavigation.vue';
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      class="bg-ivory flex min-h-screen w-[calc(100vh_*_390_/_844)] justify-center rounded-[10px] px-4 shadow-lg relative"
    >
      <!-- 메인 콘텐츠 영역에 상단 패딩 추가 -->
      <div class="w-full pt-16 pb-16 flex flex-col items-center justify-center">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
