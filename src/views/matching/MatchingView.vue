<template>
  <div class="relative flex justify-center w-full">
    <TopNavigation />
    <div class="flex flex-col min-h-[calc(100vh-120px)] bg-ivory mt-18">
      <!-- 매칭 참가자 프로필 -->
      <div class="flex justify-around px-10 items-center mb-2">
        <!-- 나 -->
        <div class="flex flex-col flex-1 items-center justify-center">
          <div class="text-limegreen-900 text-xs mb-1">
            {{ user1MatchingScore }}점
          </div>
          <img :src="MATCHING_DATA.user1.profileImageUrl" class="w-[50px]" />
        </div>
        <span class="text-limegreen-900 text-medium font-bold mt-3">VS</span>
        <!-- 상대 -->
        <div class="flex flex-col flex-1 items-center justify-center">
          <div class="text-limegreen-900 text-xs mb-2">
            {{ user2MatchingScore }}점
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
        <div class="flex flex-col flex-1 justify-center items-center">
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
        <div class="flex flex-col flex-1 justify-center items-center">
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
        <div class="flex justify-between items-center mt-4 pb-3 px-2">
          <p class="text-lg text-limegreen-900">미션 목록</p>
          <div class="relative group ml-auto">
            <img
              :src="icon_info"
              class="size-4 flex items-center justify-center rounded-full group cursor-pointer"
            />
            <!-- hover 이벤트 -->
            <div
              class="absolute right-0 -mr-2 top-full mt-1.5 w-75 bg-white border border-limegreen-500 text-xs rounded-xl shadow-lg drop-shadow-[0_8px_10px_rgba(163,230,53,0.6)] z-20 px-4 py-4 space-y-3 group-hover:block hidden"
            >
              <div v-for="(info, i) in MISSION_INFORMATION" :key="i">
                <p class="text-green-700 mb-0.5">{{ info.title }}</p>
                <p class="text-limegreen-700 leading-tight whitespace-pre-line">
                  {{ info.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 나 -->
        <div class="bg-ivory p-3 rounded-xl">
          <span
            class="bg-limegreen-100 text-green px-2 py-1 rounded-lg text-xs"
          >
            {{ MATCHING_DATA.user1.nickname }}
          </span>
          <div
            v-for="(mission, i) in MISSION_LIST.myMissionProgressList"
            :key="mission.missionId"
          >
            <div class="flex items-center mt-2">
              <div
                class="flex justify-between items-center bg-limegreen-100 w-full rounded-lg text-[13px] pl-2 py-2 text-limegreen-900"
                :class="{
                  'cursor-pointer hover:bg-limegreen-500 ': i === 0 || i === 1,
                }"
                @click="
                  () => (i === 0 ? goToWrite() : i === 1 ? confirmQuiz() : null)
                "
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
                <span class="pr-2 text-gray-300 text-[10px]">{{
                  mission.missionDoneCount + '/' + mission.missionTotalCount
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 상대 -->
        <div class="bg-ivory p-3 mt-2 rounded-xl">
          <span
            class="bg-limegreen-100 text-green px-2 py-1 rounded-lg text-xs"
          >
            {{ MATCHING_DATA.user2.nickname }}
          </span>
          <div
            v-for="(mission, i) in MISSION_LIST.opponentMissionProgressList"
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
                <span class="pr-2 text-gray-300 text-[10px]">{{
                  mission.missionDoneCount + '/' + mission.missionTotalCount
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 모달 -->
    <QuizAlertModal
      v-if="showModal"
      title="매칭 미션 퀴즈 안내"
      message="퀴즈는 매칭 기간(일주일) 동안 단 1번만 응시 가능합니다.<br/>❗️ 제출 후 재응시는 불가능합니다.<br/>준비가 되셨다면 신중하게 시작해 주세요!"
      @close="modalClose"
      @confirm="goToQuiz"
    />
    <BottomNavigation />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import img_character_user1 from '@/assets/img/characters/character_zero_1.png';
import img_character_user2 from '@/assets/img/characters/character_zero_1.png';
import icon_info from '@/assets/img/icons/feature/icon_info.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';

import QuizAlertModal from './components/QuizAlertModal.vue';

const router = useRouter();
const showModal = ref(false);

const MATCHING_DATA = ref({
  matchingId: 123,
  user1: {
    nickname: '키카오대학교라이언',
    profileImageUrl: img_character_user1,
    score: 250,
    ranking: 10,
    level: 2,
  },
  user2: {
    nickname: '카카오대학교어피치',
    profileImageUrl: img_character_user2,
    score: 200,
    ranking: 11,
    level: 2,
  },
});

const MISSION_LIST = ref({
  myMissionProgressList: [
    {
      missionId: 1,
      missionTitle: '지출 반성문 쓰기',
      missionContent:
        '돌아보니... 이건 굳이 안 썼어도 됐다 🙈 \n오늘 안 써도 됐던 소비가 있다면, 여기 적으며 반성해봐요!',
      missionScore: 10,
      missionTotalCount: 1,
      missionDoneCount: 1,
      missionRestrict: 100,
      score: 10,
    },

    {
      missionId: 502,
      missionTitle: '투자 관련 퀴즈',
      missionContent:
        '이번주, 얼마나 모아볼까요? \n 이번주에 모을 금액과 방법을 직접 정해보세요!',
      missionScore: 20,
      missionTotalCount: 1,
      missionDoneCount: 1,
      missionRestrict: 100,
      score: 20,
    },
    {
      missionId: 503,
      missionTitle: '투자 관련 컨텐츠 요약',
      missionContent:
        '일주일 동안 10만원, 직접 모아볼래요? \n 하루하루 채워가는 재미, 목표 금액을 완성해보세요!',
      missionScore: 20,
      missionTotalCount: 1,
      missionDoneCount: 1,
      missionRestrict: 100,
      score: 20,
    },
  ],
  opponentMissionProgressList: [
    {
      missionId: 1,
      missionTitle: '지출 반성문 쓰기',
      missionContent:
        '돌아보니... 이건 굳이 안 썼어도 됐다 🙈 \n오늘 안 써도 됐던 소비가 있다면, 여기 적으며 반성해봐요!',
      missionScore: 10,
      missionTotalCount: 1,
      missionDoneCount: 1,
      missionRestrict: 100,
      score: 10,
    },

    {
      missionId: 502,
      missionTitle: '투자 관련 퀴즈',
      missionContent:
        '이번주, 얼마나 모아볼까요? \n 이번주에 모을 금액과 방법을 직접 정해보세요!',
      missionScore: 20,
      missionTotalCount: 1,
      missionDoneCount: 1,
      missionRestrict: 100,
      score: 20,
    },
    {
      missionId: 503,
      missionTitle: '투자 관련 컨텐츠 요약',
      missionContent:
        '일주일 동안 10만원, 직접 모아볼래요? \n 하루하루 채워가는 재미, 목표 금액을 완성해보세요!',
      missionScore: 20,
      missionTotalCount: 1,
      missionDoneCount: 0,
      missionRestrict: 100,
      score: 0,
    },
  ],
});

// user1 매칭 점수
const user1MatchingScore = computed(() =>
  MISSION_LIST.value.myMissionProgressList.reduce(
    (total, mission) => total + mission.score,
    0
  )
);

// user2 매칭 점수
const user2MatchingScore = computed(() =>
  MISSION_LIST.value.opponentMissionProgressList.reduce(
    (total, mission) => total + mission.score,
    0
  )
);

const MISSION_INFORMATION = [
  {
    title: '✅ 즉시 반영되는 미션',
    description:
      '퀴즈나 텍스트 입력처럼 사용자가 직접 제출하는 미션은 제출과 동시에 점수가 바로 반영돼요.',
  },
  {
    title: '✅ 다음날 반영되는 미션',
    description:
      '"하루 무지출"처럼 실제 계좌 기록을 확인해야 하는 미션은 해당 날짜가 지난 뒤 다음날 자동으로 점수가 반영돼요.',
  },
  {
    title: '✅ 매칭 완료 후 반영되는 미션',
    description:
      '이번 주 지출 10만원 이하’처럼 7일간의 실제 계좌 기록을 확인해야 하는 미션은 해당 매칭이 끝난 뒤 자동으로 점수가 반영돼요.',
  },
];

const goToWrite = () => {
  router.push({ name: 'missionWrite' });
};

const confirmQuiz = () => {
  showModal.value = true;
};

const modalClose = () => {
  showModal.value = false;
};

const goToQuiz = () => {
  console.log('클릭됨');
  router.push({ name: 'missionQuiz' });
};
</script>
