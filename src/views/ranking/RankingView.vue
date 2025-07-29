<template>
  <div class="relative flex justify-center w-full h-full">
    <TopNavigation />
    <div class="mt-20 w-full">
      <!-- 1~3위 -->
      <div class="flex gap-1 items-center mb-6 px-6">
        <!-- 2위 -->
        <div
          class="flex flex-1 flex-col items-center w-25 h-40 bg-[#DFF1F9] rounded-xl px-4 pt-3 pb-4"
        >
          <span class="text-gray-300 text-lg font-semibold">{{
            secondRankUser.rankingNow
          }}</span>
          <img
            :src="profile_savings"
            class="bg-ivory rounded-full mt-2 size-15 object-cover"
          />
          <span
            class="bg-green text-white mt-[-7px] px-2.5 py-[3px] rounded-full text-[9px] text-center"
          >
            저축실천형
          </span>
          <div class="text-[13px] text-limegreen-800 mt-2">
            {{ secondRankUser.nickName }}
          </div>
          <div class="text-[11px] text-gray-300">
            {{ secondRankUser.score }}점
          </div>
        </div>
        <!-- 1등 -->
        <div
          class="flex flex-col items-center h-50 w-32 bg-limegreen-100 rounded-xl px-4 pt-3 pb-4"
        >
          <span class="text-yellow text-2xl font-semibold">
            {{ firstRankUser.rankingNow }}
          </span>
          <img
            :src="profile_savings"
            class="bg-ivory rounded-full mt-1 size-20"
          />
          <span
            class="bg-green text-white mt-[-7px] px-2.5 py-[2px] rounded-full text-xs text-center"
          >
            저축실천형
          </span>
          <div class="text-[13px] text-limegreen-800 mt-2">
            {{ firstRankUser.nickName }}
          </div>
          <div class="text-[11px] text-gray-300">
            {{ firstRankUser.score }}점
          </div>
        </div>
        <!-- 3등 -->
        <div
          class="flex flex-1 flex-col items-center bg-[#FFE7E7] w-25 h-40 rounded-xl px-4 pt-3 pb-4"
        >
          <span class="text-[#F29C3A] text-lg font-semibold">{{
            thirdRankUser.rankingNow
          }}</span>
          <img
            :src="profile_savings"
            class="bg-ivory rounded-full mt-2 size-15 object-cover"
          />
          <span
            class="bg-green text-white mt-[-7px] px-2.5 py-[3px] rounded-full text-[9px] text-center"
          >
            저축실천형
          </span>
          <div class="text-[13px] text-limegreen-800 mt-2">
            {{ thirdRankUser.nickName }}
          </div>
          <div class="text-[11px] text-gray-300">
            {{ thirdRankUser.score }}점
          </div>
        </div>
      </div>
      <!-- 랭킹 리스트 -->
      <div
        class="flex flex-grow flex-col bg-limegreen-500 rounded-t-[30px] px-3 py-2 w-full h-full mt-4"
      >
        <div
          class="max-h-[calc(100vh-415px)] overflow-scroll [&::-webkit-scrollbar]:hidden bg-limegreen-500 mx-3 mt-5 mb-1 space-y-2"
        >
          <div
            v-for="(rank, i) in restRankUsers"
            :key="i"
            class="bg-white rounded-xl px-5 py-3 flex justify-between items-center"
          >
            <div class="flex items-center gap-3">
              <div class="text-lg font-semibold text-limegreen-800">
                {{ rank.rankingNow }}
              </div>
              <div class="flex flex-col items-center ml-1">
                <img
                  :src="profile_savings"
                  class="bg-limegreen-100 rounded-full size-10"
                />
                <span
                  class="bg-green text-white mt-[-7px] px-2 py-[2.5px] rounded-full text-[7px] text-center"
                >
                  저축실천형
                </span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-limegreen-900">{{
                  rank.nickName
                }}</span>
                <span class="text-xs text-gray-500">{{ rank.score }}점</span>
              </div>
            </div>
            <div
              class="flex items-center text-xs text-red font-semibold leaning-none"
            >
              <img
                :src="rankChange"
                class="size-2 mr-1"
                :class="{ 'rotate-180': rank.rankingNow - rank.rankingEx > 0 }"
              />
              <span>{{ Math.abs(rank.rankingNow - rank.rankingEx) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BottomNavigation />
    <CongsModal
      v-if="showModal"
      title="축하합니다! 
상위 랭크에 도달했어요."
      message="보상(기프티콘) 발송을 위해 휴대폰 번호를 입력해주세요.
입력된 번호는 보상 발송 목적 외에는 사용되지 않으며, 사용 후 즉시 폐기됩니다."
      caution="‼️ 기회는 단 한 번뿐 ‼️
잘못 입력하면 보상을 받을 수 없어요."
      @submit="handlePhoneSubmit"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import profile_savings from '@/assets/img/characters/character_savings_profile.png';
import rankChange from '@/assets/img/icons/feature/icon_rankChange.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import CongsModal from '@/components/CongsModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';

// api 명세서에 맞춰 수정하기
const RANKING_LIST = [
  {
    userId: 1,
    rankingNow: 1,
    nickName: '심쿵비비',
    score: 900,
    rankingEx: 2,
  },
  {
    userId: 2,
    rankingNow: 2,
    nickName: '어피치',
    score: 900,
    rankingEx: 3,
  },
  {
    userId: 3,
    rankingNow: 3,
    nickName: '라이언',
    score: 900,
    rankingEx: 5,
  },
  {
    userId: 4,
    rankingNow: 4,
    nickName: '프로도',
    score: 900,
    rankingEx: 6,
  },
  {
    userId: 5,
    rankingNow: 5,
    nickName: '춘식이',
    score: 900,
    rankingEx: 7,
  },
  {
    userId: 6,
    rankingNow: 6,
    nickName: '멜랑콜리',
    score: 900,
    rankingEx: 8,
  },
  {
    userId: 7,
    rankingNow: 7,
    nickName: '롤로라무',
    score: 900,
    rankingEx: 10,
  },
  {
    userId: 8,
    rankingNow: 8,
    nickName: '포스아거',
    score: 900,
    rankingEx: 1,
  },
  {
    userId: 9,
    rankingNow: 9,
    nickName: '루나키키',
    score: 900,
    rankingEx: 4,
  },
  {
    userId: 10,
    rankingNow: 10,
    nickName: '무지',
    score: 900,
    rankingEx: 11,
  },
];

const secondRankUser = RANKING_LIST.find(user => user.rankingNow === 2);
const firstRankUser = RANKING_LIST.find(user => user.rankingNow === 1);
const thirdRankUser = RANKING_LIST.find(user => user.rankingNow === 3);
const restRankUsers = RANKING_LIST.filter(user => user.rankingNow > 3);

const showModal = ref(true);

function handlePhoneSubmit(phoneNumber) {
  console.log('제출된 전화번호:', phoneNumber);
}
</script>
