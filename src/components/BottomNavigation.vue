<template>
  <nav
    class="fixed bottom-0 bg-ivory w-[calc(100vh_*_390_/_844)] border-gray-200 z-10"
  >
    <div class="flex justify-around items-center py-2 pb-5 mx-auto">
      <router-link
        to="/"
        class="flex flex-col items-center no-underline! text-gray-300! transition-all duration-300 flex-1 px-1 py-2"
        :class="{ 'text-limegreen-500!': $route.path === '/' }"
      >
        <div class="flex justify-center items-center mb-1">
          <img
            :src="isActive('home') ? homeSelected : homeBasic"
            alt="home"
            class="w-6 h-6 transition-transform duration-200 object-contain hover:scale-110"
            :class="{ 'scale-110': $route.path === '/' }"
          />
        </div>
        <span
          class="text-sm font-spoqa text-center"
          :class="{ 'font-semibold': $route.path === '/' }"
        >
          Home
        </span>
      </router-link>

      <router-link
        to="/ranking"
        class="flex flex-col items-center no-underline! text-gray-300! transition-all duration-300 flex-1 px-1 py-2"
        :class="{ 'text-limegreen-500!': $route.path === '/ranking' }"
      >
        <div class="flex justify-center items-center mb-1">
          <img
            :src="isActive('ranking') ? rankingSelected : rankingBasic"
            alt="ranking"
            class="w-6 h-6 transition-transform duration-200 object-contain hover:scale-110"
            :class="{ 'scale-110': $route.path === '/ranking' }"
          />
        </div>
        <span
          class="text-sm font-spoqa text-center"
          :class="{ 'font-semibold': $route.path === '/ranking' }"
        >
          Ranking
        </span>
      </router-link>

      <router-link
        to="/matching"
        class="flex flex-col items-center no-underline! text-gray-300! transition-all duration-300 flex-1 px-1 py-2"
        :class="{ 'text-limegreen-500!': $route.path === '/matching' }"
      >
        <div class="flex justify-center items-center mb-1">
          <img
            :src="isActive('matching') ? matchingSelected : matchingBasic"
            alt="matching"
            class="w-6 h-6 transition-transform duration-200 object-contain hover:scale-110"
            :class="{ 'scale-110': $route.path === '/matching' }"
          />
        </div>
        <span
          class="text-sm font-spoqa text-center"
          :class="{ 'font-semibold': $route.path === '/matching' }"
        >
          Matching
        </span>
      </router-link>

      <router-link
        to="/mypage"
        class="flex flex-col items-center no-underline! text-gray-300! transition-all duration-300 flex-1 px-1 py-2"
        :class="{ 'text-limegreen-500!': $route.path === '/mypage' }"
      >
        <div class="flex justify-center items-center mb-1">
          <img
            :src="isActive('mypage') ? mypageSelected : mypageBasic"
            alt="mypage"
            class="w-6 h-6 transition-transform duration-200 object-contain hover:scale-110"
            :class="{ 'scale-110': $route.path === '/mypage' }"
          />
        </div>
        <span
          class="text-sm font-spoqa text-center"
          :class="{ 'font-semibold': $route.path === '/mypage' }"
        >
          MyPage
        </span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';

// 이미지 import
import homeBasic from '@/assets/img/icons/navbar/navbar_home_basic.png';
import homeSelected from '@/assets/img/icons/navbar/navbar_home_selected.png';
import matchingBasic from '@/assets/img/icons/navbar/navbar_matching_basic.png';
import matchingSelected from '@/assets/img/icons/navbar/navbar_matching_selected.png';
import mypageBasic from '@/assets/img/icons/navbar/navbar_mypage_basic.png';
import mypageSelected from '@/assets/img/icons/navbar/navbar_mypage_selected.png';
import rankingBasic from '@/assets/img/icons/navbar/navbar_ranking_basic.png';
import rankingSelected from '@/assets/img/icons/navbar/navbar_ranking_selected.png';

const route = useRoute();

// 현재 경로가 해당 네비게이션과 일치하는지 확인
const isActive = navType => {
  const paths = {
    home: '/',
    ranking: '/ranking',
    matching: '/matching',
    mypage: '/mypage',
  };
  return route.path === paths[navType];
};
</script>

<style scoped></style>
