<template>
  <div class="min-h-screen flex flex-col items-center">
    <TopNavigation :show-back="true" :show-logo-text="false" />

    <p class="text-[25px] h-[25px] my-10">자산 연동</p>
    <!-- 은행 목록 컨테이너 -->
    <div
      class="font-spoqa text-[16px] bg-limegreen-100 w-[332px] rounded-2xl p-4 flex flex-col gap-3 max-h-[563px] overflow-y-auto [&::-webkit-scrollbar]:hidden"
    >
      <div
        v-for="bank in BANK_LIST"
        :key="bank.id"
        class="flex items-center p-4 bg-white rounded-[10px] cursor-pointer transition-all duration-200 border-2 border-transparent hover:-translate-y-0.5 hover:shadow-md"
        :class="{
          'bg-limegreen-500!': selectedBank === bank.id,
        }"
        @click="toggleBankSelection(bank.id)"
      >
        <div class="w-10 h-10 mr-4 flex items-center justify-center">
          <img
            :src="bank.icon"
            :alt="bank.name"
            class="w-full h-full object-contain"
          />
        </div>
        <div
          class="text-base font-medium"
          :class="selectedBank === bank.id ? 'text-white' : 'text-black'"
        >
          {{ bank.name }}
        </div>
      </div>
    </div>

    <!-- 선택 버튼 -->
    <div class="w-[332px] bottom-10 fixed">
      <button
        class="w-full bg-limegreen-500 text-limegreen-900 rounded-[10px] h-12 text-[22px]!"
        @click="confirmSelection"
      >
        선택
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import TopNavigation from '@/components/TopNavigation.vue';

import { BANK_LIST } from './constants/bankList';

const selectedBank = ref(null);

function toggleBankSelection(bankId) {
  if (selectedBank.value === bankId) {
    selectedBank.value = null;
  } else {
    selectedBank.value = bankId;
  }
}

function confirmSelection() {
  console.log('선택된 은행:', selectedBank.value);
  // 여기에 선택 확인 로직 추가
}
</script>

<style scoped>
/* Tailwind CSS로 대체되었으므로 스타일 섹션 제거 */
</style>
