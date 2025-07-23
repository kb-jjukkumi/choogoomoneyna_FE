<template>
  <TopNavigation />
  <div class="relative pt-3 px-6 bg-ivory">
    <!-- 계좌 정보 -->
    <div
      class="flex flex-col bg-limegreen-500 h-[110px] rounded-xl text-center justify-center p-4 mb-6"
    >
      <p
        class="bg-limegreen-100 text-limegreen-600 text-center text-xs px-[6px] py-[1px] mx-auto my-0.5 rounded-[5px] w-fit"
      >
        {{ type }}
      </p>
      <p class="text-limegreen-900 text-lg leading-tight mb-1">
        {{ bankName }} {{ accountNumber }}
      </p>
      <p class="text-green text-xl leading-none">{{ formattedBalance }}원</p>
    </div>

    <!-- 거래 내역 -->
    <div>
      <div class="flex justify-between items-center mt-6 mb-4">
        <!-- 왼쪽: 제목 -->
        <p class="text-limegreen-900 text-xl">거래 내역</p>

        <!-- 오른쪽: 필터 -->
        <FilterTransferType />
      </div>

      <div
        class="max-h-[calc(100vh-320px)] overflow-scroll [&::-webkit-scrollbar]:hidden font-spoqa"
      >
        <div
          class="bg-limegreen-100 px-4 py-3 rounded-xl mb-3 flex justify-between items-start"
          v-for="(transaction, i) in transactions"
          :key="i"
        >
          <!-- 왼쪽: 날짜, 설명 -->
          <div class="text-left">
            <p class="text-xs text-limegreen-900 mb-1">
              {{ transaction.date }}
            </p>
            <p class="text-sm text-limegreen-800 text-medium">
              {{ transaction.desc }}
            </p>
          </div>
          <!-- 오른쪽: 금액, 잔액 -->
          <div class="text-right">
            <p class="text-limegreen-800 text-sm font-medium mt-5">
              {{ transaction.transferType }}
              {{ transaction.amount.toLocaleString() }}원
            </p>
            <p class="text-gray-300 text-xs">
              잔액 {{ transaction.balance.toLocaleString() }}원
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BottomNavigation />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';

import FilterTransferType from './components/FilterTransferType.vue';

const route = useRoute();
const bankName = route.params.bankName;
const accountNumber = route.params.accountNumber;
const type = route.params.type;
const totalBalance = Number(route.query.balance || 0);

const formattedBalance = computed(() => totalBalance.toLocaleString());

const selectedType = ref('전체');

const transactions = ref([
  {
    transferType: '출금',
    desc: '메머드 커피',
    amount: 1500,
    balance: 597000,
    date: '2025.07.16 14:22',
  },
  {
    transferType: '출금',
    desc: '메머드 커피',
    amount: 1500,
    balance: 598500,
    date: '2025.07.16 14:22',
  },
  {
    transferType: '입금',
    desc: '알바비',
    amount: 100000,
    balance: 600000,
    date: '2025.07.16 14:22',
  },
  {
    transferType: '입금',
    desc: '알바비',
    amount: 100000,
    balance: 600000,
    date: '2025.07.16 14:22',
  },
  {
    transferType: '입금',
    desc: '알바비',
    amount: 100000,
    balance: 600000,
    date: '2025.07.16 14:22',
  },
  {
    transferType: '입금',
    desc: '알바비',
    amount: 100000,
    balance: 600000,
    date: '2025.07.16 14:22',
  },
  {
    transferType: '입금',
    desc: '알바비',
    amount: 100000,
    balance: 600000,
    date: '2025.07.16 14:22',
  },
  {
    transferType: '입금',
    desc: '알바비',
    amount: 100000,
    balance: 600000,
    date: '2025.07.16 14:22',
  },
]);
</script>
