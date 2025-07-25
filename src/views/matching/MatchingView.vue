<template>
  <TopNavigation />
  <div class="relative flex flex-col min-h-[calc(100vh-120px)] bg-ivory mt-18">
    <!-- 매칭 참가자 프로필 -->
    <div class="flex justify-around px-10 items-center mb-2">
      <!-- 나 -->
      <div class="flex flex-col items-center">
        <div class="text-limegreen-900 text-xs mb-1">
          {{ MATCHING_DATA.user1.matchingscore }}점
        </div>
        <img :src="MATCHING_DATA.user1.profileImageUrl" class="w-[50px]" />
      </div>

      <span class="text-limegreen-900 text-medium font-bold mt-3">VS</span>

      <!-- 상대 -->
      <div class="flex flex-col items-center">
        <div class="text-limegreen-900 text-xs mb-2">
          {{ MATCHING_DATA.user2.matchingscore }}점
        </div>
        <img :src="MATCHING_DATA.user2.profileImageUrl" class="w-[50px]" />
      </div>
    </div>

    <div class="h-2.5 bg-yellow rounded-full mx-6 overflow-hidden">
      <div
        class="h-full bg-red"
        :style="{
          width:
            (MATCHING_DATA.user1.score /
              (MATCHING_DATA.user1.score + MATCHING_DATA.user2.score)) *
              100 +
            '%',
        }"
      ></div>
    </div>

    <div class="flex justify-around px-10 items-center mt-2 mb-4">
      <!-- 나 -->
      <div class="flex flex-col items-center">
        <span
          class="bg-limegreen-100 text-limegreen-900 px-2.5 py-1 rounded-full text-[9px] z-10"
        >
          {{ MATCHING_DATA.user1.ranking }}위
        </span>
        <div class="text-xs text-limegreen-900 mt-1">
          {{ MATCHING_DATA.user1.nickname }}
        </div>
        <div class="text-[10px] text-gray-300">
          {{
            'Lv.' +
            MATCHING_DATA.user1.level +
            ' / ' +
            MATCHING_DATA.user1.score +
            '점'
          }}
        </div>
      </div>

      <!-- 상대 -->
      <div class="flex flex-col items-center">
        <span
          class="bg-limegreen-100 text-limegreen-900 px-2.5 py-1 rounded-full text-[9px] z-10"
        >
          {{ MATCHING_DATA.user2.ranking }}위
        </span>
        <div class="text-xs text-limegreen-900 mt-1">
          {{ MATCHING_DATA.user2.nickname }}
        </div>
        <div class="text-[10px] text-gray-300">
          {{
            'Lv.' +
            MATCHING_DATA.user2.level +
            ' / ' +
            MATCHING_DATA.user2.score +
            '점'
          }}
        </div>
      </div>
    </div>

    <!-- 미션 목록 -->
    <div
      class="flex-1 bg-limegreen-500 rounded-t-[30px] px-6 py-2 w-full h-full mx-auto flex flex-col"
    >
      <p class="text-lg text-limegreen-900 mt-4 pb-3 px-2">미션 목록</p>

      <!-- 나 -->
      <div class="bg-ivory p-3 rounded-xl">
        <span class="bg-limegreen-100 text-green px-2 py-1 rounded-lg text-xs">
          {{ MATCHING_DATA.user1.nickname }}
        </span>
        <div
          v-for="(mission, i) in MATCHING_DATA.missionList"
          :key="mission.missionId"
        >
          <div class="flex items-center mt-2">
            <div
              class="flex justify-between items-center bg-limegreen-100 w-full rounded-lg text-[13px] pl-2 py-2 text-limegreen-900"
              :class="{
                'cursor-pointer hover:bg-limegreen-500 ': i === 1,
              }"
              @click="() => i === 1 && goToQuiz()"
            >
              <div>
                <span class="text-green">{{
                  '[' + mission.missionScore + '점] '
                }}</span>
                <span class="text-limegreen-900">
                  {{
                    (i === 0 ? '공통 미션: ' : '지출제로형 미션: ') +
                    mission.missionTitle
                  }}
                </span>
              </div>
              <span class="pr-2 text-gray-300 text-[10px]">1/1</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 상대 -->
      <div class="bg-ivory p-3 mt-2 rounded-xl">
        <span class="bg-limegreen-100 text-green px-2 py-1 rounded-lg text-xs">
          {{ MATCHING_DATA.user2.nickname }}
        </span>
        <div
          v-for="(mission, i) in MATCHING_DATA.missionList"
          :key="mission.missionId"
        >
          <div class="flex items-center mt-2">
            <div
              class="flex justify-between items-center bg-limegreen-100 w-full rounded-lg text-[13px] pl-2 py-2 text-limegreen-900"
            >
              <div>
                <span class="text-green">{{
                  '[' + mission.missionScore + '점] '
                }}</span>
                <span class="text-limegreen-900">
                  {{
                    (i === 0 ? '공통 미션: ' : '지출제로형 미션: ') +
                    mission.missionTitle
                  }}
                </span>
              </div>
              <span class="pr-2 text-gray-300 text-[10px]">1/1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BottomNavigation />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import img_character_user1 from '@/assets/img/characters/character_zero_1.png';
import img_character_user2 from '@/assets/img/characters/character_zero_1.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';

const router = useRouter();

const MATCHING_DATA = ref({
  matchingId: 123,
  user1: {
    nickname: '키카오대학교라이언',
    profileImageUrl: img_character_user1,
    score: 250,
    ranking: 10,
    level: 2,
    matchingscore: 50,
  },
  user2: {
    nickname: '카카오대학교어피치',
    profileImageUrl: img_character_user2,
    score: 200,
    ranking: 11,
    level: 2,
    matchingscore: 20,
  },
  missionList: [
    {
      missionId: 1,
      missionTitle: '지출 반성문 쓰기',
      missionContent:
        '돌아보니... 이건 굳이 안 썼어도 됐다 🙈 \n오늘 안 써도 됐던 소비가 있다면, 여기 적으며 반성해봐요!',
      missionScore: 10,
    },
    {
      missionId: 502,
      missionTitle: '투자 관련 퀴즈',
      missionContent:
        '이번주, 얼마나 모아볼까요? \n 이번주에 모을 금액과 방법을 직접 정해보세요!',
      missionScore: 20,
    },
    {
      missionId: 503,
      missionTitle: '투자 관련 컨텐츠 요약',
      missionContent:
        '일주일 동안 10만원, 직접 모아볼래요? \n 하루하루 채워가는 재미, 목표 금액을 완성해보세요!',
      missionScore: 20,
    },
  ],
  matchingStatus: 'PROGRESS',
  matchingStart: '2025-07-14',
  matchingFinish: '2025-07-21',
});

const goToQuiz = () => {
  console.log('클릭됨');
  router.push({ name: 'missionQuiz' });
};
</script>
