<template>
  <div class="pt-16 px-9 bg-ivory min-h-screen">
    <!-- 계좌 정보 -->
    <div
      class="bg-limegreen-500 h-[180px] rounded-[20px] text-center flex flex-col justify-center p-4 mb-10"
    >
      <p
        class="bg-limegreen-100 text-limegreen-600 text-center text-[20px] px-2 py-1 mx-auto my-1 rounded-[8px] w-fit"
      >
        {{ type }}
      </p>
      <p class="text-limegreen-900 text-[25px] leading-tight mb-1">
        {{ bankName }} {{ accountNumber }}
      </p>
      <p class="text-green text-[30px]">{{ formattedBalance }}원</p>
    </div>

    <!-- 거래 내역 -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <!-- 왼쪽: 제목 -->
        <p class="text-limegreen-900 text-[33px]">거래 내역</p>

        <!-- 오른쪽: 필터 -->
        <div class="w-fit">
          <FilterTransferType />
        </div>
      </div>

      <div
        class="h-[140px] font-spoqa bg-limegreen-100 p-6 rounded-[20px] mb-3 flex justify-between items-start"
        v-for="(transaction, i) in transactions"
        :key="i"
      >
        <!-- 왼쪽: 날짜, 설명 -->
        <div class="text-left">
          <p class="text-sm text-limegreen-900 mb-2">
            {{ transaction.date }}
          </p>
          <p class="text-2xl text-medium">
            {{ transaction.desc }}
          </p>
        </div>

        <!-- 오른쪽: 금액, 잔액 -->
        <div class="text-right">
          <p class="text-2xl font-weight mt-8 text-limegreen-800">
            {{ transaction.transferType }}
            {{ transaction.amount.toLocaleString() }}원
          </p>
          <p class="text-basic text-gray-300 mt-1">
            잔액 {{ transaction.balance.toLocaleString() }}원
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

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
]);
</script>
