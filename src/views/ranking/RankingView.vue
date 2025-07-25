<template>
  <TopNavigation />
  <div class="mt-15">
    <!-- 1~3위 -->
    <div class="relative flex justify-center items-end gap-2 mb-6 px-6">
      <!-- 2위 -->
      <div
        class="flex flex-col h-40 items-center bg-limegreen-100 rounded-xl px-3 pt-3"
      >
        <!-- 2위 메달 -->
        <img :src="icon_second" class="size-8 mt-[-20px]" />
        <img :src="profile_savings" class="bg-ivory rounded-full mt-1.5 w-18" />
        <span
          class="bg-green text-white mt-[-7px] px-2.5 py-[3px] rounded-full text-[9px] text-center"
        >
          저축실천형
        </span>
        <div class="text-xs text-limegreen-900 mt-1">카카오대학교라이언</div>
        <div class="text-xs text-gray-300">1000점</div>
      </div>

      <!-- 1등 -->
      <div
        class="flex flex-col h-40 items-center bg-limegreen-100 rounded-xl px-2 pt-3"
      >
        <!-- 1위 메달 -->
        <img :src="icon_first" class="size-8 mt-[-20px]" />
        <img :src="profile_savings" class="bg-ivory rounded-full mt-1.5 w-18" />
        <span
          class="bg-green text-white mt-[-7px] px-2.5 py-[3px] rounded-full text-[9px] text-center"
        >
          저축실천형
        </span>
        <div class="text-xs text-limegreen-900 mt-1">카카오대학교라이언</div>
        <div class="text-xs text-gray-300">1000점</div>
      </div>

      <!-- 3등 -->
      <div
        class="flex flex-col h-40 items-center bg-limegreen-100 rounded-xl px-3 pt-3"
      >
        <!-- 3위 메달 -->
        <img :src="icon_third" class="size-8 mt-[-20px]" />
        <img :src="profile_savings" class="bg-ivory rounded-full mt-1.5 w-18" />
        <span
          class="bg-green text-white mt-[-7px] px-2.5 py-[3px] rounded-full text-[9px] text-center"
        >
          저축실천형
        </span>
        <div class="text-xs text-limegreen-900 mt-1">카카오대학교라이언</div>
        <div class="text-xs text-gray-300">1000점</div>
      </div>
    </div>

    <!-- 랭킹 리스트 -->
    <div
      class="flex flex-grow flex-col bg-limegreen-500 rounded-t-[30px] px-3 py-2 w-full h-full mt-4"
    >
      <div
        class="max-h-[calc(100vh-320px)] overflow-scroll [&::-webkit-scrollbar]:hidden bg-limegreen-500 mx-3 mt-7 space-y-3"
      >
        <div
          v-for="rank in RANKS"
          :key="rank.id"
          class="bg-white rounded-xl px-4 py-3 flex justify-between items-center"
        >
          <div class="flex items-center gap-3">
            <div class="text-lg font-semibold">{{ rank.rank }}</div>
            <img :src="profile_savings" class="w-10 h-10" />
            <div class="flex flex-col">
              <span class="text-sm font-medium">{{ rank.name }}</span>
              <span class="text-xs text-gray-500">{{ rank.score }}점</span>
            </div>
          </div>
          <div class="text-xs text-red-500 font-semibold">
            🔺{{ rank.diff }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <BottomNavigation />
</template>

<script setup>
import profile_savings from '@/assets/img/characters/character_savings_profile.png';
import icon_first from '@/assets/img/icons/feature/icon_first.png';
import icon_second from '@/assets/img/icons/feature/icon_second.png';
import icon_third from '@/assets/img/icons/feature/icon_third.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';

// api 명세서에 맞춰 수정하기
const RANKS = [
  { id: 1, rank: 1, name: '카카오대학교라이언', score: 900, diff: 3 },
  { id: 2, rank: 2, name: '카카오대학교라이언', score: 900, diff: 3 },
  { id: 3, rank: 3, name: '카카오대학교라이언', score: 900, diff: 3 },
  { id: 4, rank: 4, name: '카카오대학교라이언', score: 900, diff: 3 },
  { id: 5, rank: 5, name: '카카오대학교라이언', score: 900, diff: 3 },
  { id: 6, rank: 6, name: '카카오대학교라이언', score: 900, diff: 3 },
  { id: 7, rank: 7, name: '카카오대학교라이언', score: 900, diff: 3 },
  { id: 8, rank: 8, name: '카카오대학교라이언', score: 900, diff: 3 },
  { id: 9, rank: 9, name: '카카오대학교라이언', score: 900, diff: 3 },
  { id: 10, rank: 10, name: '카카오대학교라이언', score: 900, diff: 3 },
];
</script>

<style scoped></style>
