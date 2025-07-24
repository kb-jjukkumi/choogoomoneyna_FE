<template>
  <TopNavigation />
  <div class="flex justify-center w-full">
    <div class="bg-ivory flex w-full flex-col gap-8 px-6">
      <!-- 프로필-->
      <div class="flex flex-col items-center gap-3">
        <!-- 캐릭터 -->
        <div
          class="relative flex flex-col items-center gap-1 bg-limegreen-100 rounded-full w-[180px] h-[180px]"
        >
          <img
            :src="character_savings"
            alt="저축실천형 캐릭터"
            class="w-[120px] mt-8 mb-1.5"
          />
          <!-- 추구미 유형명 -->
          <div
            class="bg-green text-white px-4 py-1 rounded-full text-xs text-center"
          >
            저축실천형
          </div>
          <div
            class="absolute bottom-3 right-0.5 bg-limegreen-500 w-9 h-9 rounded-full border-3 border-ivory p-2"
          >
            <img :src="edit" alt="수정 아이콘" class="" />
          </div>
        </div>

        <!-- 닉네임 -->
        <p class="text-limegreen-800 text-lg text-center mt-1">
          카카오대학교라이언
        </p>

        <!-- 레벨 -->
        <div class="flex flex-col gap-1">
          <div class="bg-limegreen-100 h-2.5 rounded-xl">
            <div class="bg-green h-full w-1/2 rounded-xl"></div>
          </div>
          <div class="text-center text-limegreen-700 text-xs">Lv.2 / 410점</div>
        </div>

        <!-- 현재 순위 & 최근 성적 -->
        <div class="flex justify-between text-center items-center">
          <div class="flex flex-col gap-1">
            <div class="text-[14px] text-limegreen-700">현재 순위</div>
            <div class="text-[17px] text-green">5위</div>
          </div>
          <div class="h-[70%] bg-limegreen-100 w-0.5 mx-8"></div>
          <div class="flex flex-col gap-1">
            <div class="text-[14px] text-limegreen-700">최근 성적</div>
            <div class="text-[17px] text-green">3승 2패</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BottomNavigation />
</template>

<script setup>
import character_savings from '@/assets/img/characters/savings.png';
import edit from '@/assets/img/icons/feature/icon_edit.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';
</script>
