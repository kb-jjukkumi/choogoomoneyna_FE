<template>
  <TopNavigation />
  <div class="relative flex flex-col min-h-[calc(100vh-120px)] bg-ivory mt-10">
    <!-- 매칭 참가자 프로필 -->
    <div class="flex justify-around px-12 items-center mb-6">
      <!-- 나 -->
      <div class="flex flex-col items-center">
        <span
          class="absolute -top-[2px] bg-limegreen-100 text-limegreen-900 px-2.5 py-1 rounded-full text-[9px] z-10"
        >
          {{ MATCHING_DATA.user1.ranking }}
        </span>
        <img
          :src="MATCHING_DATA.user1.profileImageUrl"
          class="bg-limegreen-100 rounded-full mt-1.5 w-23"
        />
        <span
          class="bg-green text-white mt-[-7px] px-2.5 py-[3px] rounded-full text-[9px] text-center"
        >
          저축실천형
        </span>
        <div class="text-xs text-limegreen-900 mt-2">카카오대학교라이언</div>
        <div class="text-xs text-gray-300">1000점</div>
      </div>
      <span class="text-limegreen-900 text-medium font-bold mt-5">VS</span>
      <!-- 상대 -->
      <div class="flex flex-col items-center">
        <span
          class="absolute -top-[2px] bg-limegreen-100 text-limegreen-900 px-2.5 py-1 rounded-full text-[9px] z-10"
        >
          {{ MATCHING_DATA.user2.ranking }}
        </span>
        <img
          :src="MATCHING_DATA.user2.profileImageUrl"
          class="bg-limegreen-100 rounded-full mt-1.5 w-23"
        />
        <span
          class="bg-green text-white mt-[-7px] px-2.5 py-[3px] rounded-full text-[9px] text-center"
        >
          저축실천형
        </span>
        <div class="text-xs text-limegreen-900 mt-2">카카오대학교라이언</div>
        <div class="text-xs text-gray-300">1000점</div>
      </div>
    </div>

    <!-- 미션 목록 -->
    <div
      class="flex-1 bg-limegreen-500 rounded-t-[30px] px-6 py-2 w-full h-full mx-auto flex flex-col"
    >
      <p class="text-lg text-limegreen-900 pt-5 pb-4 px-2">미션 목록</p>

      <div
        v-for="(mission, i) in MATCHING_DATA.missionList"
        :key="mission.missionId"
        class="mt-1"
      >
        <div class="flex items-center">
          <!-- 미션 번호 -->
          <span
            class="bg-limegreen-100 text-limegreen-900 rounded-lg px-2 py-0.5 text-sm"
          >
            {{ i + 1 }}
          </span>
          <!-- 미션 제목 -->
          <div class="text-sm font-semibold text-limegreen-900 pl-2">
            {{
              (i === 0 ? '공통 미션: ' : '저축실천형 미션: ') +
              mission.missionTitle +
              ' (' +
              mission.missionScore +
              '점)'
            }}
          </div>
        </div>

        <!-- 미션 설명 -->
        <div
          class="bg-ivory text-gray-300 mt-2 mb-2 px-3 py-2 text-xs rounded-xl whitespace-pre-line"
        >
          {{ mission.missionContenet }}
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="mt-auto mb-6">
        <button
          class="w-full bg-ivory text-limegreen-800 py-3 rounded-xl text-sm font-semibold"
        >
          미션 현황
        </button>
      </div>
    </div>
  </div>
  <BottomNavigation />
</template>

<script setup>
import { ref } from 'vue';

import profile_savings from '@/assets/img/characters/character_savings_profile.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';

const MATCHING_DATA = ref({
  matchingId: 123,
  user1: {
    nickname: '키카오대학교라이언',
    profileImageUrl: profile_savings,
    score: 200,
    ranking: 10,
  },
  user2: {
    nickname: '카카오대학교어피치',
    profileImageUrl: profile_savings,
    score: 250,
    ranking: 11,
  },
  missionList: [
    {
      missionId: 1,
      missionTitle: '지출 반성문 쓰기',
      missionContenet:
        '돌아보니... 이건 굳이 안 썼어도 됐다 🙈 \n오늘 안 써도 됐던 소비가 있다면, 여기 적으며 반성해봐요!',
      missionScore: 10,
    },
    {
      missionId: 502,
      missionTitle: '이번주 저축 계획 세우기',
      missionContenet:
        '이번주, 얼마나 모아볼까요? \n 이번주에 모을 금액과 방법을 직접 정해보세요!',
      missionScore: 10,
    },
    {
      missionId: 503,
      missionTitle: '일주일간 10만원 모으기',
      missionContenet:
        '일주일 동안 10만원, 직접 모아볼래요? \n 하루하루 채워가는 재미, 목표 금액을 완성해보세요!',
      missionScore: 30,
    },
  ],
  matchingStatus: 'PROGRESS',
  matchingStart: '2025-07-14',
  matchingFinish: '2025-07-21',
});
</script>
