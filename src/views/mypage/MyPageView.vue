<template>
  <div class="relative flex justify-center min-h-screen w-full">
    <TopNavigation :show-back="false" :show-logo-text="true" />
    <div
      class="bg-ivory flex flex-grow w-full flex-col items-center justify-center gap-1 px-6"
    >
      <!-- 프로필-->
      <div class="relative flex flex-col items-center gap-2.5 w-full -top-4">
        <!-- 캐릭터 -->
        <div
          class="flex flex-col items-center gap-1 bg-limegreen-100 rounded-full w-[150px] h-[150px]"
        >
          <img
            :src="character_savings"
            alt="저축실천형 캐릭터"
            class="w-[100px] mt-7"
          />
          <!-- 추구미 유형명 -->
          <div class="relative">
            <button
              class="group flex justify-center items-center gap-1 bg-green text-white px-2 py-1 rounded-full relative"
            >
              <div
                class="flex text-center text-xs tracking-widest items-center leading-none text-[14px]"
              >
                저축실천형
              </div>
              <div class="flex justify-center items-center">
                <img :src="edit" alt="수정 아이콘" class="h-3 w-3" />
              </div>

              <div
                v-if="!editableDay"
                class="absolute left-full top-1/2 -translate-y-1/2 w-30 ml-2 whitespace-pre-wrap bg-ivory border-3 border-limegreen-500 text-limegreen-700 text-xs rounded-[10px] px-2 py-1.5 z-10 hidden group-hover:block shadow-[2px_2px_6px_0px] shadow-limegreen-500"
              >
                변경 가능 시간<br />
                : 매달 첫째 주 일요일
              </div>
            </button>
          </div>
        </div>

        <!-- 닉네임 -->
        <p class="text-limegreen-800 text-normal text-center mt-1">
          {{ userInfo.nickname }}
        </p>

        <!-- 레벨 -->
        <div class="flex flex-col gap-1 w-[60%]">
          <div class="bg-limegreen-100 h-2 rounded-full">
            <div class="bg-green h-full w-1/2 rounded-full"></div>
          </div>
          <div class="text-center text-limegreen-700 text-xs">
            Lv.{{ userInfo.userLevel }} / {{ userInfo.userScore }}점
          </div>
        </div>

        <!-- 현재 순위 & 최근 성적 -->
        <div class="flex justify-between text-center items-center text-sm">
          <div class="flex flex-col gap-1">
            <div class="text-limegreen-700">현재 순위</div>
            <div class="text-green">{{ userInfo.userRanking }}위</div>
          </div>
          <!-- 현재 순위와 최근 성적 구별선 -->
          <div class="h-[70%] bg-limegreen-100 w-0.5 mx-8"></div>
          <div class="flex flex-col gap-1">
            <div class="text-limegreen-700">최근 성적</div>
            <div class="text-green">
              {{ userInfo.userWin }}승 {{ userInfo.userLose }}패
            </div>
          </div>
        </div>
      </div>
      <!--버튼 영역-->
      <div class="px-4 w-full">
        <div class="flex flex-col gap-2.5">
          <MyPageBtn text="나의 자산 분석 리포트" to="home" />
          <MyPageBtn text="나의 매칭 기록" to="mypageRecord" />
          <MyPageBtn text="사전 조사 다시하기" to="survey" />
          <MyPageBtn text="회원 정보 수정" to="mypageEditInfo" />
          <button
            class="w-full bg-ivory border-2 border-limegreen-500 text-limegreen-500 h-12 rounded-[10px]"
            @click="showModal = true"
          >
            로그아웃
          </button>
        </div>
      </div>
      <ConfirmModal
        v-if="showModal"
        title="로그아웃"
        message="정말 로그아웃하시겠습니까?"
        :cancelBtn="'취소'"
        :confirmBtn="'로그아웃'"
        @cancel="showModal = false"
        @confirm="logout"
      />
    </div>
  </div>
  <BottomNavigation />
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

import axiosInstance from '@/api/axios';
import character_savings from '@/assets/img/characters/character_savings.png';
import edit from '@/assets/img/icons/feature/icon_edit.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import router from '@/router';
import { isEditableDay } from '@/utils/dateUtils';

import MyPageBtn from './components/MyPageBtn.vue';

const showModal = ref(false);

const userInfo = reactive({
  choogoomiName: 'C',
  nickname: '카카오대학교라이언',
  userLevel: 2,
  userScore: 410,
  userRanking: 5,
  isLevelUp: false,
});

const editableDay = isEditableDay();

const logout = () => {
  localStorage.clear();
  router.push('/login');
};

onMounted(async () => {
  try {
    const { data } = await axiosInstance.get('/api/users/main-profile');
    // userInfo에 가져온 데이터 할당
    userInfo.choogoomiName = data.choogoomiName;
    userInfo.nickname = data.nickname;
    userInfo.userLevel = data.userLevel;
    userInfo.userScore = data.userScore;
    userInfo.userRanking = data.userRanking;
    userInfo.isLevelUp = data.isLevelUp;
  } catch (error) {
    console.error('프로필 정보 불러오기 실패');
  }
});
</script>
