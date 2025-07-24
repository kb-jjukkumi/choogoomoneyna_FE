<template>
  <TopNavigation />

  <!-- 전체 페이지 wrapper -->
  <div class="relative flex flex-col main_wrapper bg-ivory min-h-screen mt-20">
    <!-- 프로필 박스 -->
    <div class="flex flex-col items-center">
      <!-- 프로필 캐릭터 -->
      <img
        :src="img_character"
        alt="지출제로형 캐릭터"
        class="w-[100px] mx-auto mt-8 mb-2"
      />

      <!-- 추구미 유형명 -->
      <span
        class="bg-green text-white px-2.5 py-[2px] rounded-full text-xs text-center tracking-wide"
      >
        지출제로형
      </span>

      <!-- 닉네임 -->
      <p class="text-limegreen-800 text-lg text-center my-[2px]">
        카카오대학교라이언
      </p>

      <!-- 레벨 박스 -->
      <div class="p-1 w-70 max-w-[400px] mx-auto">
        <!-- 레벨 표시 바 - 전체 -->
        <div class="bg-limegreen-100 h-[9px] rounded-xl mb-[2px]">
          <!-- 레벨 표시 바 - 현재 레벨 -->
          <div class="bg-green h-full w-1/2 rounded-xl"></div>
        </div>
        <!-- 현재 레벨 & 점수 -->
        <div class="text-center text-limegreen-700 text-xs">Lv.2 / 410점</div>
      </div>

      <!-- 현재 순위 & 최근 성적 -->
      <div class="flex justify-between text-center w-full max-w-[400px] px-30">
        <div>
          <span class="text-[14px] text-limegreen-700">현재 순위</span><br />
          <span class="text-[17px] text-green">5위</span>
        </div>
        <div>
          <span class="text-[14px] text-limegreen-700">최근 성적</span><br />
          <span class="text-[17px] text-green">3승 2패</span>
        </div>
      </div>
    </div>

    <!-- 연동 계좌 목록 박스 -->
    <div
      class="flex flex-grow flex-col bg-limegreen-500 rounded-t-[30px] px-3 py-2 w-full h-full mt-4 mx-auto"
    >
      <p class="text-lg text-limegreen-900 pt-4 pb-3 px-4">연동 계좌 목록</p>

      <!-- 연동 계좌 목록 -->
      <!-- 계좌 목록의 길이가 '430px'을 넘어가면 스크롤 처리 -->
      <div
        class="max-h-[calc(100vh-550px)] overflow-scroll [&::-webkit-scrollbar]:hidden mb-1 px-3 space-y-2"
      >
        <div
          v-for="(account, i) in ACCOUNTS"
          :key="i"
          @click="goToTransaction(account)"
          class="bg-ivory rounded-xl px-3 py-2 flex items-center cursor-pointer"
        >
          <!-- 은행 로고 -->
          <img
            :src="account.bankLogo"
            alt="은행 로고"
            class="size-12 object-contain"
          />
          <!-- 계좌 정보 -->
          <div class="flex-1 flex-col ml-6">
            <p
              class="bg-limegreen-100 text-limegreen-600 text-[10px] px-2 py-[2px] rounded-[5px] w-fit"
            >
              {{ account.accountName }}
            </p>
            <p class="text-limegreen-900 text-[11px] my-[1px]">
              {{ account.bankId }} {{ account.accountNum }}
            </p>
            <p class="text-limegreen-800 text-[14px]">
              {{ account.accountBalance.toLocaleString() }}원
            </p>
          </div>

          <!-- 새로고침 -->
          <div
            class="text-gray-300 text-[10px] flex items-end gap-1 scale-90 mt-[-35px]"
          >
            {{ account.date }}
            <div
              class="size-3.5 border rounded-full flex items-center justify-center"
            >
              <img :src="icon_refresh" alt="새로고침 아이콘" class="size-2" />
            </div>
          </div>
        </div>
      </div>

      <!-- 계좌 추가 버튼 -->
      <div
        class="bg-ivory rounded-xl my-1 mx-3 flex justify-center items-center"
      >
        <img :src="icon_plus" alt="추가하기 아이콘" class="size-7 m-1" />
      </div>
    </div>
  </div>
  <BottomNavigation />
</template>

<script setup>
import { useRouter } from 'vue-router';

import bank_kakao from '@/assets/img/banks/bank_kakao.png';
import bank_kb from '@/assets/img/banks/bank_kb.png';
import bank_shinhan from '@/assets/img/banks/bank_shinhan.png';
import bank_woori from '@/assets/img/banks/bank_woori.png';
import img_character from '@/assets/img/characters/character_zero_1.png';
import icon_plus from '@/assets/img/icons/feature/icon_plus.png';
import icon_refresh from '@/assets/img/icons/feature/icon_refresh.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';

const router = useRouter();

const ACCOUNTS = [
  {
    accountNum: '2452-12-24521',
    bankId: '국민',
    bankLogo: bank_kb,
    accountName: 'KB마이핏통장',
    accountBalance: 500000,
    date: '2025.07.16 14:22',
  },
  {
    bankId: '신한',
    bankLogo: bank_shinhan,
    accountName: '신한 통장',
    accountNum: '2452-12-24521',
    accountBalance: 500000,
    date: '2025.07.16 14:22',
  },
  {
    bankId: '카카오',
    bankLogo: bank_kakao,
    accountName: '카카오 통장',
    accountNum: '2452-12-24521',
    accountBalance: 500000,
    date: '2025.07.16 14:22',
  },
  {
    bankId: '우리',
    bankLogo: bank_woori,
    accountName: '우리 통장',
    accountNum: '2452-12-24521',
    accountBalance: 500000,
    date: '2025.07.16 14:22',
  },
];

const goToTransaction = account => {
  router.push({
    name: 'transaction',
    params: {
      bankId: account.bankId,
      accountNum: account.accountNum,
      accountName: account.accountName,
    },
    query: {
      accountBalance: account.accountBalance,
    },
  });
};
</script>
