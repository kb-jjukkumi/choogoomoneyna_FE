<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import BottomNavigation from '@/components/BottomNavigation.vue';

import TopNavigation from './components/TopNavigation.vue';

const route = useRoute();

const isNeedNavigation = computed(() => {
  return ['/', '/ranking', '/matching', '/mypage'].includes(route.path);
});

// 페이지별 TopNavigation props 설정
const topNavigationProps = computed(() => {
  const currentPath = route.path;
  switch (currentPath) {
    case '/':
      return {
        showBack: false,
        showLogoText: true, // 홈에서 로고 보이게
      };
    case '/login':
      return {
        showBack: false,
        showLogoText: false,
      };
    case '/ranking':
    case '/matching':
    case '/mypage':
      return {
        showBack: false,
        showLogoText: true,
      };
    default:
      return {
        showBack: true,
        showLogoText: false,
      };
  }
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      class="bg-ivory flex min-h-screen w-[390px] justify-center rounded-[10px] shadow-lg relative z-10"
    >
      <!-- TopNavigation: 로그인 페이지가 아닐 때만 표시 -->
      <TopNavigation
        v-if="isNeedNavigation"
        :show-back="topNavigationProps.showBack"
        :logo-text="topNavigationProps.logoText"
      />

      <!-- 메인 콘텐츠 영역 -->
      <div
        class="w-full flex flex-col items-center justify-center"
        :class="{
          'pt-16 pb-16': topNavigationProps.showBack, // 네비게이션이 있을 때 패딩 적용
          'pt-4 pb-4': !topNavigationProps.showBack, // 로그인 페이지일 때 최소 패딩
        }"
      >
        <router-view />
      </div>

      <!-- BottomNavigation: 로그인 페이지가 아닐 때만 표시 -->
      <BottomNavigation v-if="isNeedNavigation" />
    </div>
  </div>
</template>

<style scoped></style>
