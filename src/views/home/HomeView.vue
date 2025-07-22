<template>
  <div class="flex flex-col main_wrapper bg-ivory min-h-screen mt-20">
    <TopNavigation />
    <!-- 프로필 박스 -->
    <div class="flex flex-col items-center">
      <!-- 프로필 캐릭터 -->
      <img
        :src="character_savings"
        alt="저축실천형 캐릭터"
        class="w-[120px] mx-auto mt-13"
      />

      <!-- 추구미 유형명 -->
      <span
        class="bg-green text-white px-2.5 py-[2px] rounded-full text-xs my-1 text-center tracking-wide"
      >
        저축실천형
      </span>

      <!-- 닉네임 -->
      <p class="text-limegreen-800 text-lg text-center my-[2px]">
        카카오대학교라이언
      </p>

      <!-- 레벨 박스 -->
      <div class="p-2 w-70 max-w-[400px] mx-auto">
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
      class="flex flex-col bg-limegreen-500 rounded-t-[30px] px-3 py-2 w-full h-full mt-5 mx-auto"
    >
      <p class="text-lg text-limegreen-900 pt-4 pb-3 px-4">연동 계좌 목록</p>

      <!-- 연동 계좌 목록 -->
      <!-- 계좌 목록의 길이가 '430px'을 넘어가면 스크롤 처리 -->
      <div
        class="flex-grow max-h-[194px] overflow-scroll [&::-webkit-scrollbar]:hidden mb-1 px-3 space-y-2"
      >
        <div
          v-for="(account, i) in accounts"
          :key="i"
          @click="goToTransaction(account)"
          class="bg-ivory rounded-xl px-3 py-2 flex items-center cursor-pointer"
        >
          <!-- 은행 로고 -->
          <img
            :src="account.logo"
            alt="은행 로고"
            class="size-12 object-contain"
          />
          <!-- 계좌 정보 -->
          <div class="flex-1 flex-col ml-6">
            <p
              class="bg-limegreen-100 text-limegreen-600 text-[10px] px-2 py-[2px] rounded-[5px] w-fit"
            >
              입출금
            </p>
            <p class="text-limegreen-900 text-[11px] my-[1px]">
              {{ account.bankName }} {{ account.accountNumber }}
            </p>
            <p class="text-limegreen-800 text-[14px]">
              {{ account.balance.toLocaleString() }}원
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
    <BottomNavigation />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import bank_kakao from '@/assets/img/banks/bank_kakao.png';
import bank_kb from '@/assets/img/banks/bank_kb.png';
import bank_shinhan from '@/assets/img/banks/bank_shinhan.png';
import bank_woori from '@/assets/img/banks/bank_woori.png';
import character_savings from '@/assets/img/characters/savings.png';
import icon_plus from '@/assets/img/icons/feature/icon_plus.png';
import icon_refresh from '@/assets/img/icons/feature/icon_refresh.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';

const router = useRouter();

const accounts = [
  {
    logo: bank_kb,
    type: '입출금',
    bankName: '국민',
    accountNumber: '2452-12-24521',
    balance: 500000,
    date: '2025.07.16 14:22',
  },
  {
    logo: bank_shinhan,
    type: '입출금',
    bankName: '신한',
    accountNumber: '2452-12-24521',
    balance: 500000,
    date: '2025.07.16 14:22',
  },
  {
    logo: bank_kakao,
    type: '입출금',
    bankName: '카카오',
    accountNumber: '2452-12-24521',
    balance: 500000,
    date: '2025.07.16 14:22',
  },
  {
    logo: bank_woori,
    type: '입출금',
    bankName: '우리',
    accountNumber: '2452-12-24521',
    balance: 500000,
    date: '2025.07.16 14:22',
  },
];

const goToTransaction = account => {
  router.push({
    name: 'transaction',
    params: {
      bankName: account.bankName,
      accountNumber: account.accountNumber,
      type: account.type,
    },
    query: {
      balance: account.balance,
    },
  });
};
</script>
