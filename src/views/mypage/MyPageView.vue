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
                v-if="!isEditableDay"
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
          카카오대학교라이언
        </p>

        <!-- 레벨 -->
        <div class="flex flex-col gap-1 w-[60%]">
          <div class="bg-limegreen-100 h-2 rounded-full">
            <div class="bg-green h-full w-1/2 rounded-full"></div>
          </div>
          <div class="text-center text-limegreen-700 text-xs">Lv.2 / 410점</div>
        </div>

        <!-- 현재 순위 & 최근 성적 -->
        <div class="flex justify-between text-center items-center text-sm">
          <div class="flex flex-col gap-1">
            <div class="text-limegreen-700">현재 순위</div>
            <div class="text-green">5위</div>
          </div>
          <!-- 현재 순위와 최근 성적 구별선 -->
          <div class="h-[70%] bg-limegreen-100 w-0.5 mx-8"></div>
          <div class="flex flex-col gap-1">
            <div class="text-limegreen-700">최근 성적</div>
            <div class="text-green">3승 2패</div>
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
import { computed, ref } from 'vue';

import character_savings from '@/assets/img/characters/character_savings.png';
import edit from '@/assets/img/icons/feature/icon_edit.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import router from '@/router';

import MyPageBtn from './components/MyPageBtn.vue';

const showModal = ref(false);

const isEditableDay = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // 해당 달의 1일부터 7일까지
  for (let day = 1; day <= 7; day++) {
    const date = new Date(year, month, day);

    // 일요일 찾음
    if (date.getDay() === 0) {
      //오늘이 첫째주 일요일이라면
      return (
        today.getDate() === date.getDate() &&
        today.getMonth() === date.getMonth() &&
        today.getFullYear() === date.getFullYear()
      );
    }
  }
  return false;
});

const logout = () => {
  localStorage.clear();
  router.push('/login');
};
</script>
