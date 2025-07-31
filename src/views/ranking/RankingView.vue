<template>
  <div class="relative flex justify-center w-full h-full">
    <TopNavigation />
    <div class="mt-14 w-full">
      <div class="relative">
        <p class="text-lg text-limegreen-800 mb-3 text-center">명예의 전당</p>
        <div
          class="absolute top-1/2 left-1/2 translate-x-[45px] pb-3 -translate-y-1.5 group"
        >
          <img
            :src="icon_info"
            alt="정보 아이콘"
            class="size-3.5 cursor-pointer"
          />
          <!-- hover 이벤트 -->
          <div
            class="absolute top-full -translate-x-[65%] w-75 bg-white border-none text-center rounded-xl shadow-sm drop-shadow-[0_8px_10px_rgba(183,202,112,0.5)] z-20 px-5 py-4 space-y-3 group-hover:block hidden"
          >
            <p class="text-green text-3xl mt-3 mb-3">{{ aboutReward.title }}</p>
            <p class="text-green text-[13px] leading-snug whitespace-pre-line">
              {{ aboutReward.content }}
            </p>
            <div
              v-for="choogoomiName in choogoomiNames"
              :key="choogoomiName"
              class="text-xs leading-tight text-limegreen-800 whitespace-pre-line mt-2 space-y-1"
            >
              <div>
                <p class="text-bold text-[13px] text-yellow">
                  {{
                    CHOOGOOMI_MAP.find(c => c.choogoomiName === choogoomiName)
                      ?.userLevel[0].choogoomiType
                  }}
                </p>
              </div>
              <div
                v-for="(reward, rank) in rewardMap[choogoomiName]"
                :key="rank"
              >
                {{ rank + '등: ' + reward }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 지난주 랭킹 명예의 전당 -->
      <div class="flex gap-1 items-center mb-2 px-6">
        <!-- 2등 -->
        <div
          class="flex flex-1 flex-col items-center w-25 h-40 bg-[#DFF1F9] rounded-xl px-4 pt-3 pb-4"
        >
          <span class="text-gray-300 text-lg font-semibold">{{
            secondRankUser.ranking
          }}</span>
          <img
            :src="choogoomiCharacter[secondRankUser.userNickname]"
            class="bg-ivory rounded-full mt-2 size-15 object-cover"
          />
          <span
            class="bg-green text-white mt-[-7px] px-2.5 py-[3px] rounded-full text-[9px] text-center"
          >
            {{ choogoomiType[secondRankUser.userNickname] }}
          </span>
          <div class="text-[13px] text-limegreen-800 mt-2">
            {{ secondRankUser.userNickname }}
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
            {{ firstRankUser.ranking }}
          </span>
          <img
            :src="choogoomiCharacter[firstRankUser.userNickname]"
            class="bg-ivory rounded-full mt-1 size-20"
          />
          <span
            class="bg-green text-white mt-[-7px] px-2.5 py-[2px] rounded-full text-xs text-center"
          >
            {{ choogoomiType[firstRankUser.userNickname] }}
          </span>
          <div class="text-[13px] text-limegreen-800 mt-2">
            {{ firstRankUser.userNickname }}
          </div>
          <div class="text-[11px] text-gray-300">
            {{ firstRankUser.score }}점
          </div>
        </div>

        <!-- 3등 -->
        <div
          class="flex flex-1 flex-col items-center bg-[#FFE7E7] w-25 h-40 rounded-xl px-4 pt-3 pb-4"
        >
          <span class="text-[#F29C3A] text-lg font-semibold">
            {{ thirdRankUser.ranking }}
          </span>
          <img
            :src="choogoomiCharacter[thirdRankUser.userNickname]"
            class="bg-ivory rounded-full mt-2 size-15 object-cover"
          />
          <span
            class="bg-green text-white mt-[-7px] px-2.5 py-[3px] rounded-full text-[9px] text-center"
          >
            {{ choogoomiType[thirdRankUser.userNickname] }}
          </span>
          <div class="text-[13px] text-limegreen-800 mt-2">
            {{ thirdRankUser.userNickname }}
          </div>
          <div class="text-[11px] text-gray-300">
            {{ thirdRankUser.score }}점
          </div>
        </div>
      </div>

      <!-- 이번주 실시간 랭킹 -->
      <div
        class="flex flex-grow flex-col bg-limegreen-500 rounded-t-[30px] px-3 py-2 w-full h-full mt-4"
      >
        <p class="text-lg text-limegreen-900 text-center pt-3 pb-4 px-4">
          실시간 랭킹
        </p>
        <div
          class="max-h-[calc(100vh-450px)] overflow-scroll [&::-webkit-scrollbar]:hidden bg-limegreen-500 mx-3 mb-1 space-y-2"
        >
          <div
            v-for="(rank, i) in RANKING_LIST"
            :key="i"
            class="bg-white rounded-xl px-5 py-2 flex justify-between items-center"
          >
            <div class="flex items-center gap-3">
              <div class="text-lg font-semibold text-limegreen-800">
                {{ rank.ranking }}
              </div>
              <div class="flex flex-col items-center ml-1">
                <img
                  :src="choogoomiCharacter[rank.userNickname]"
                  class="bg-limegreen-100 rounded-full size-10"
                />
                <span
                  class="bg-green text-white mt-[-7px] px-2 py-[2.5px] rounded-full text-[7px] text-center"
                >
                  {{ choogoomiType[rank.userNickname] }}
                </span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-limegreen-900">{{
                  rank.userNickname
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
                :class="{ 'rotate-180': rank.ranking - rank.befRanking > 0 }"
              />
              <span>{{ Math.abs(rank.ranking - rank.befRanking) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BottomNavigation />

    <RewardModal
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

import icon_info from '@/assets/img/icons/feature/icon_info.png';
import rankChange from '@/assets/img/icons/feature/icon_rankChange.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import RewardModal from '@/components/RewardModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import { CHOOGOOMI_MAP } from '@/constants/choogoomiMap.js';
import { REWARD_LIST } from '@/constants/rewardList.js';
import { getLevel } from '@/utils/levelUtils.js';

// 모달 표시 여부
const showModal = ref(false);

const aboutReward = {
  title: '🎁',
  content: `매주 월요일, 지난주 점수를 기준으로 집계됩니다.\n 순위별로 유형별 맞춤 상품이 차등 지급될 예정입니다.`,
};

const USER_PROFILE = {
  choogoomiName: 'A',
  nickname: '',
  userScore: 500,
  userRanking: 20,
  isLevelUp: false,
};

const LAST_RANKING_LIST = ref([
  {
    userNickname: '쭈꾸미',
    ranking: 1,
    score: 500,
    choogoomiName: 'A',
  },
  {
    userNickname: '오징어',
    ranking: 2,
    score: 490,
    choogoomiName: 'A',
  },
  {
    userNickname: '낙지',
    ranking: 3,
    score: 480,
    choogoomiName: 'A',
  },
]);

const RANKING_LIST = [
  {
    ranking: 1,
    userNickname: '심쿵비비',
    befRanking: 2,
    score: 900,
    choogoomiName: 'C',
  },
  {
    ranking: 2,
    userNickname: '어피치',
    befRanking: 3,
    score: 900,
    choogoomiName: 'C',
  },
  {
    ranking: 3,
    userNickname: '라이언',
    befRanking: 5,
    score: 900,
    choogoomiName: 'C',
  },
  {
    ranking: 4,
    userNickname: '프로도',
    befRanking: 6,
    score: 900,
    choogoomiName: 'A',
  },
  {
    ranking: 5,
    userNickname: '춘식이',
    befRanking: 7,
    score: 900,
    choogoomiName: 'B',
  },
  {
    ranking: 6,
    userNickname: '멜랑콜리',
    befRanking: 8,
    score: 900,
    choogoomiName: 'D',
  },
  {
    ranking: 7,
    userNickname: '롤로라무',
    befRanking: 10,
    score: 900,
    choogoomiName: 'E',
  },
  {
    ranking: 8,
    userNickname: '포스아거',
    befRanking: 1,
    score: 900,
    choogoomiName: 'A',
  },
  {
    ranking: 9,
    userNickname: '루나키키',
    befRanking: 4,
    score: 900,
    choogoomiName: 'B',
  },
  {
    ranking: 10,
    userNickname: '무지',
    befRanking: 11,
    score: 900,
    choogoomiName: 'D',
  },
];

const secondRankUser = LAST_RANKING_LIST.value.find(user => user.ranking === 2);
const firstRankUser = LAST_RANKING_LIST.value.find(user => user.ranking === 1);
const thirdRankUser = LAST_RANKING_LIST.value.find(user => user.ranking === 3);

// 유저 닉네임이 지난주 랭킹 top3에 포함되면 모달 표시
if (
  [firstRankUser, secondRankUser, thirdRankUser].some(
    user => user && user.userNickname === USER_PROFILE.nickname
  )
) {
  showModal.value = true;
}

// 중간 매핑: [userNickname, { 추구미유형, 캐릭터 }] 쌍 배열
const allUsers = [...LAST_RANKING_LIST.value, ...RANKING_LIST];
const rewardEntries = allUsers.map(user => {
  const level = getLevel(user.score);

  const mapEntry = CHOOGOOMI_MAP.find(
    item => item.choogoomiName === user.choogoomiName
  );
  return [
    user.userNickname,
    {
      choogoomiType: mapEntry.userLevel[level].choogoomiType,
      profile: new URL(mapEntry.userLevel[level].profile, import.meta.url).href,
    },
  ];
});

// choogoomiName만 추출 -> 'v-for'에 사용
const choogoomiNames = [...new Set(allUsers.map(user => user.choogoomiName))];

// 유형 이름 객체로 변환 (nickname -> 지출제로형)
const choogoomiType = Object.fromEntries(
  rewardEntries.map(([nickname, data]) => [nickname, data.choogoomiType])
);

// 프로필 이미지 객체로 변환 (nickname -> profile 이미지 경로)
const choogoomiCharacter = Object.fromEntries(
  rewardEntries.map(([nickname, data]) => [nickname, data.profile])
);

// 보상 매핑 객체 (A -> {1: "...", 2: "...", 3: "..."})
const rewardMap = Object.fromEntries(
  REWARD_LIST.map(item => [item.choogoomiName, item.rewards])
);

function handlePhoneSubmit(phoneNumber) {
  console.log('제출된 전화번호:', phoneNumber);
}
</script>
