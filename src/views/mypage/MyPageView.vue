<template>
  <div class="relative flex justify-center min-h-screen w-full">
    <TopNavigation :show-back="false" :show-logo-text="true" />
    <div
      class="bg-ivory flex flex-grow w-full flex-col items-center justify-center gap-5 px-6"
    >
      <!-- 프로필-->
      <div class="flex flex-col items-center gap-2 w-full">
        <!-- 캐릭터 -->
        <div
          class="flex flex-col items-center gap-1 bg-limegreen-100 rounded-full w-[170px] h-[170px]"
        >
          <img
            :src="character_savings"
            alt="저축실천형 캐릭터"
            class="w-[120px] mt-7"
          />
          <!-- 추구미 유형명 -->
          <button
            class="flex justify-center items-center gap-1 bg-green text-white px-2.5 py-2 rounded-full text-sm text-center tracking-widest"
          >
            <div class="flex items-center leading-none text-[14px]">
              저축실천형
            </div>
            <div class="flex justify-center items-center">
              <img :src="edit" alt="수정 아이콘" class="h-3 w-3" />
            </div>
          </button>
        </div>

        <!-- 닉네임 -->
        <p class="text-limegreen-800 text-lg text-center mt-2">
          카카오대학교라이언
        </p>

        <!-- 레벨 -->
        <div class="flex flex-col gap-1 w-[70%]">
          <div class="bg-limegreen-100 h-2.5 rounded-full">
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
        <div class="flex flex-col gap-3">
          <MyPageBtn text="나의 리포트 기록" to="home" />
          <MyPageBtn text="나의 매칭 기록" to="mypageRecord" />
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
import { ref } from 'vue';

import character_savings from '@/assets/img/characters/character_savings.png';
import edit from '@/assets/img/icons/feature/icon_edit.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import router from '@/router';

import MyPageBtn from './components/MyPageBtn.vue';

const showModal = ref(false);

const logout = () => {
  localStorage.clear();
  router.push('/login');
};
</script>
