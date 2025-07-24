<template>
  <div
    class="min-h-screen flex flex-col items-center relative justify-center px-6"
  >
    <TopNavigation
      :show-back="true"
      :show-logo-text="true"
      :logo-text="'자산 연동'"
    />
    <!-- 은행 목록 컨테이너 -->
    <div
      class="font-spoqa text-[16px] bg-limegreen-100 w-full rounded-2xl p-6 flex flex-col gap-3 max-h-[calc(100vh-300px)] overflow-y-auto [&::-webkit-scrollbar]:hidden"
    >
      <div
        v-for="bank in BANK_LIST"
        :key="bank.bankId"
        class="flex items-center p-4 bg-white rounded-[10px] cursor-pointer transition-all duration-200 border-2 border-transparent hover:-translate-y-0.5 hover:shadow-md"
        :class="{
          'bg-limegreen-500!': selectedBank === bank.bankId,
        }"
        @click="toggleBankSelection(bank.bankId)"
      >
        <div class="flex items-center justify-center mr-4">
          <BankIcon :assets="bank.icon" :alt="bank.name" :size="10" />
        </div>
        <div
          :class="selectedBank === bank.bankId ? 'text-white' : 'text-black'"
        >
          {{ bank.name }}
        </div>
      </div>
    </div>

    <!-- 선택 버튼 -->
    <div class="w-[332px] bottom-10 fixed">
      <button
        class="w-full bg-limegreen-500 text-limegreen-900 rounded-[10px] h-12 text-[22px]! disabled:opacity-50"
        :disabled="!selectedBank"
        @click="confirmSelection"
      >
        선택
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import TopNavigation from '@/components/TopNavigation.vue';

import BankIcon from '../connect/components/BankIcon.vue';
import { BANK_LIST } from '../constants/bankList';

const selectedBank = ref(null);
const router = useRouter();

const toggleBankSelection = bankId => {
  if (selectedBank.value === bankId) {
    selectedBank.value = null;
  } else {
    selectedBank.value = bankId;
  }
};

const goToConnect = bankId => {
  if (!bankId) return;

  router.push({ name: 'assetConnect', query: { bankId } });
};

const confirmSelection = () => {
  goToConnect(selectedBank.value);
};
</script>

<style scoped>
/* Tailwind CSS로 대체되었으므로 스타일 섹션 제거 */
</style>
