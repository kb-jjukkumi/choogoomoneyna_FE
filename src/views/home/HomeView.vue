<template>
  <div class="main_wrapper bg-ivory min-h-screen pt-50">
    <!-- 프로필 박스 -->
    <div class="mb-8 flex flex-col items-center">
      <!-- 프로필 캐릭터 -->
      <img
        :src="character_savings"
        alt="저축실천형 캐릭터"
        class="w-[250px] mx-auto"
      />

      <!-- 추구미 유형명 -->
      <span
        class="bg-green text-white px-5 py-1 rounded-full text-xl mt-[-20px] mb-1 text-center tracking-wide"
      >
        저축실천형
      </span>

      <!-- 닉네임 -->
      <h2 class="text-[35px] text-center my-4">카카오대학교라이언</h2>

      <!-- 레벨 박스 -->
      <div class="rounded-xl p-2 w-full max-w-[400px] mx-auto">
        <!-- 레벨 표시 바 - 전체 -->
        <div class="bg-limegreen-100 h-[15px] rounded-xl mb-2">
          <!-- 레벨 표시 바 - 현재 레벨 -->
          <div class="bg-green h-full w-1/2 rounded-xl"></div>
        </div>
        <!-- 현재 레벨 & 점수 -->
        <div class="text-center text-limegreen-700 text-[20px] pt-0.5">
          Lv.2 / 410점
        </div>
      </div>

      <!-- 현재 순위 & 최근 성적 -->
      <div
        class="flex justify-between text-center mt-4 w-full max-w-[400px] px-15"
      >
        <div>
          <span class="text-[23px] text-limegreen-700">현재 순위</span><br />
          <span class="text-[28px] text-green">5위</span>
        </div>
        <div>
          <span class="text-[25px] text-limegreen-700">최근 성적</span><br />
          <span class="text-[28px] text-green">3승 2패</span>
        </div>
      </div>
    </div>

    <!-- 연동 계좌 목록 박스 -->
    <div
      class="bg-limegreen-500 rounded-t-[50px] p-6 w-[calc(100vh*390/844)] h-[680px] mx-auto"
    >
      <p class="text-[33px] text-limegreen-900 pt-6 pb-7 px-4">
        연동 계좌 목록
      </p>

      <!-- 연동 계좌 목록 -->
      <!-- 계좌 목록의 길이가 '374px'을 넘어가면 스크롤 처리 -->
      <div
        class="max-h-[430px] overflow-scroll [&::-webkit-scrollbar]:hidden px-3 space-y-5"
      >
        <div
          v-for="(account, i) in accounts"
          :key="i"
          @click="goToTransaction(account)"
          class="bg-ivory rounded-[20px] p-4 flex items-center cursor-pointer"
        >
          <!-- 은행 로고 -->
          <img
            :src="account.logo"
            alt="은행 로고"
            class="ml-2 w-20 h-20 object-contain"
          />
          <!-- 계좌 정보 -->
          <div class="flex-1 flex-col ml-6">
            <p
              class="bg-limegreen-100 text-limegreen-600 text-[9px] px-2 py-1 rounded-[8px] w-fit mb-1 scale-90"
            >
              입출금
            </p>
            <p class="text-limegreen-900 text-[17px] leading-tight mb-1">
              {{ account.bankName }} {{ account.accountNumber }}
            </p>
            <p class="text-limegreen-800 text-[27px]">
              {{ account.balance.toLocaleString() }}원
            </p>
          </div>

          <!-- 새로고침 -->
          <div
            class="text-gray-300 text-xs flex items-end gap-1 scale-90 mt-[-30px]"
          >
            {{ account.date }}
            <div
              class="w-[22px] h-[22px] border rounded-full flex items-center justify-center"
            >
              <img
                :src="icon_refresh"
                alt="새로고침 아이콘"
                class="w-[12px] h-[12px]"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 계좌 추가 버튼 -->
      <div
        class="bg-[#fffcee] rounded-xl mt-5 mx-3 flex justify-center items-center"
      >
        <img
          :src="icon_plus"
          alt="추가하기 아이콘"
          class="w-[45px] h-[45px] m-3"
        />
      </div>
    </div>
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
    },
    query: {
      balance: account.balance,
    },
  });
};
</script>
