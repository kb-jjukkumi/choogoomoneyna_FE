<template>
  <div class="relative flex justify-center">
    <TopNavigation />
    <div class="flex flex-col w-full min-h-[calc(100vh-120px)] bg-ivory mt-18">
      <!-- 매칭 참가자 프로필 -->
      <div class="flex justify-around px-10 items-center mb-2">
        <!-- 매칭 점수 비교 -->
        <!-- 나 -->
        <div class="flex flex-col flex-1 items-center justify-center">
          <div class="text-limegreen-900 text-xs mb-1">
            {{ myMatchingScore }}점
          </div>
          <img :src="myUserData.profileImageUrl" class="w-[50px]" />
        </div>
        <span class="text-limegreen-900 text-medium font-bold mt-3">VS</span>
        <!-- 상대 -->
        <div class="flex flex-col flex-1 items-center justify-center">
          <div class="text-limegreen-900 text-xs mb-2">
            {{ opponentMatchingScore }}점
          </div>
          <img :src="opponentUserData.profileImageUrl" class="w-[50px]" />
        </div>
      </div>

      <!-- 매칭 점수 게이지 바 -->
      <div class="h-2.5 bg-yellow rounded-full mx-6 overflow-hidden">
        <div
          class="h-full bg-red"
          :style="{
            width:
              (myUserData.matchingScore /
                (myUserData.matchingScore + opponentUserData.matchingScore)) *
                100 +
              '%',
          }"
        ></div>
      </div>

      <!-- 프로필 정보 -->
      <div class="flex justify-around px-10 items-center mt-2 mb-4">
        <!-- 나 -->
        <div class="flex flex-col flex-1 justify-center items-center">
          <span
            class="bg-limegreen-100 text-limegreen-900 px-2.5 py-1 rounded-full text-[9px] z-10"
          >
            {{ myUserData.ranking }}위
          </span>
          <div class="text-xs text-limegreen-900 mt-1">
            {{ myUserData.nickname }}
          </div>
          <div class="text-[10px] text-gray-300">
            {{
              'Lv.' + myUserData.level + ' / ' + myUserData.totalScore + '점'
            }}
          </div>
        </div>

        <!-- 상대 -->
        <div class="flex flex-col flex-1 justify-center items-center">
          <span
            class="bg-limegreen-100 text-limegreen-900 px-2.5 py-1 rounded-full text-[9px] z-10"
          >
            {{ opponentUserData.ranking }}위
          </span>
          <div class="text-xs text-limegreen-900 mt-1">
            {{ opponentUserData.nickname }}
          </div>
          <div class="text-[10px] text-gray-300">
            {{
              'Lv.' +
              opponentUserData.level +
              ' / ' +
              opponentUserData.totalScore +
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

            <!-- hover 이벤트 - 미션별 점수 반영 시기 -->
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
            {{ myUserData.nickname }}
          </span>
          <div v-for="(mission, i) in myMissionList" :key="mission.missionId">
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
                  mission.score + '/' + mission.missionScore
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
            {{ opponentUserData.nickname }}
          </span>
          <div
            v-for="(mission, i) in opponentMissionList"
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
                  mission.score + '/' + mission.missionScore
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 모달 -->
    <!-- 퀴즈 안내 모달 -->
    <QuizAlertModal
      v-if="showModal"
      title="매칭 미션 퀴즈 안내"
      message="퀴즈는 매칭 기간(일주일) 동안 단 1번만 응시 가능합니다.<br/>❗️ 제출 후 재응시는 불가능합니다.<br/>준비가 되셨다면 신중하게 시작해 주세요!"
      @close="modalClose"
      @confirm="goToQuiz"
    />

    <!-- 매칭 결과 모달 -->
    <MatchingResultModal v-if="showResultModal" @close="closeResultModal" />

    <BottomNavigation />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { fetchMatchingData } from '@/api/matchingApi';
import icon_info from '@/assets/img/icons/feature/icon_info.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import { CHOOGOOMI_MAP } from '@/constants/choogoomiMap';
import { getLevel } from '@/utils/levelUtils';

import MatchingResultModal from './components/MatchingResultModal.vue';
import QuizAlertModal from './components/QuizAlertModal.vue';

const router = useRouter();

const showModal = ref(false); // 퀴즈 안내 모달
const showResultModal = ref(false); // 매칭 결과 모달

// 사용자 프로필 정보
const myUserData = ref({});
const opponentUserData = ref({});
// 미션 정보
const myMissionList = ref({});
const opponentMissionList = ref({});

const myChoogoomiName = 'A';
const opponentChoogoomiName = 'A';

// 매칭 점수
const myMatchingScore = ref(0);
const opponentMatchingScore = ref(0);

// 페이지 로드 시 매칭 데이터 fetch 및 상태 초기화
onMounted(async () => {
  try {
    const matchingData = await fetchMatchingData();

    // 나의 프로필 정보
    const myData = matchingData.myMissionProgressList[0];

    const myRanking = matchingData.myRanking;
    const myNickname = myData.userNickname;
    const myTotalScore = matchingData.myTotalScore;
    const myLevel = getLevel(myTotalScore);
    const myCharacter = new URL(
      CHOOGOOMI_MAP.find(c => c.choogoomiName === myChoogoomiName).userLevel[
        myLevel
      ].character,
      import.meta.url
    ).href;

    myUserData.value = {
      ranking: myRanking,
      profileImageUrl: myCharacter,
      nickname: myNickname,
      totalScore: myTotalScore,
      level: myLevel,
      matchingScore: 0,
    };

    // 상대의 프로필 정보
    const opponentData = matchingData.opponentMissionProgressList[0];

    const opponentRanking = matchingData.opponentRanking;
    const opponentNickname = opponentData.userNickname;
    const opponentTotalScore = matchingData.opponentTotalScore;
    const opponentLevel = getLevel(opponentTotalScore);
    const opponentCharacter = new URL(
      CHOOGOOMI_MAP.find(c => c.choogoomiName === myChoogoomiName).userLevel[
        opponentLevel
      ].character,
      import.meta.url
    ).href;

    opponentUserData.value = {
      ranking: opponentRanking,
      profileImageUrl: opponentCharacter,
      nickname: opponentNickname,
      totalScore: opponentTotalScore,
      level: opponentLevel,
      matchingScore: 0,
    };

    // 나의 미션 리스트
    const myMission = matchingData.myMissionProgressList;

    myMissionList.value = myMission.map(mission => ({
      missionId: mission.missionId,
      missionTitle: mission.missionTitle,
      missionContent: mission.missionContent,
      missionScore: mission.missionScore,
      score: mission.score,
    }));

    // 상대의 미션 리스트
    const opponentMission = matchingData.opponentMissionProgressList;
    opponentMissionList.value = opponentMission.map(mission => ({
      missionId: mission.missionId,
      missionTitle: mission.missionTitle,
      missionContent: mission.missionContent,
      missionScore: mission.missionScore,
      score: mission.score,
    }));

    // 나의 매칭 점수 계산
    myMatchingScore.value = myMissionList.value.reduce(
      (acc, cur) => acc + cur.score,
      0
    );

    // 상대의 매칭 점수 계산
    opponentMatchingScore.value = opponentMissionList.value.reduce(
      (acc, cur) => acc + cur.score,
      0
    );
  } catch (err) {
    console.error('매칭 데이터 불러오기 실패:', err);
  }
});

// hover 이벤트 - 미션 점수 반영 시기
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

// 매칭 결과 모달 닫기
const closeResultModal = () => {
  showResultModal.value = false;
};

// 글쓰기 미션 페이지로 이동
const goToWrite = () => {
  router.push({ name: 'missionWrite' });
};

// 퀴즈 모달 열기
const confirmQuiz = () => {
  showModal.value = true;
};

// 퀴즈 모달 닫기
const modalClose = () => {
  showModal.value = false;
};

// 퀴즈 미션 페이지로 이동
const goToQuiz = () => {
  router.push({ name: 'missionQuiz' });
};
</script>
