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

import bankBnkIcon from '@/assets/img/icons/banks/bank_bnk.png';
import bankCitiIcon from '@/assets/img/icons/banks/bank_citi.png';
import bankFsbIcon from '@/assets/img/icons/banks/bank_fsb.png';
import bankHanaIcon from '@/assets/img/icons/banks/bank_hana.png';
import bankIbkIcon from '@/assets/img/icons/banks/bank_ibk.png';
import bankJbIcon from '@/assets/img/icons/banks/bank_jb.png';
import bankKakaoIcon from '@/assets/img/icons/banks/bank_kakao.png';
import bankKbIcon from '@/assets/img/icons/banks/bank_kb.png';
import bankKbankIcon from '@/assets/img/icons/banks/bank_kbank.png';
import bankKdbIcon from '@/assets/img/icons/banks/bank_kdb.png';
import bankKfccIcon from '@/assets/img/icons/banks/bank_kfcc.png';
import bankNcufkIcon from '@/assets/img/icons/banks/bank_ncufk.png';
import bankNhIcon from '@/assets/img/icons/banks/bank_nh.png';
import bankPostofficeIcon from '@/assets/img/icons/banks/bank_postoffice.png';
import bankScIcon from '@/assets/img/icons/banks/bank_sc.png';
import bankShinhanIcon from '@/assets/img/icons/banks/bank_shinhan.png';
import bankSuhyupIcon from '@/assets/img/icons/banks/bank_suhyup.png';
import bankTossIcon from '@/assets/img/icons/banks/bank_toss.png';
import bankWooriIcon from '@/assets/img/icons/banks/bank_woori.png';
import TopNavigation from '@/components/TopNavigation.vue';

const selectedBank = ref(null);

const BANK_LIST = [
  {
    id: 'kb',
    name: '국민은행',
    icon: bankKbIcon,
  },
  {
    id: 'ibk',
    name: '기업은행',
    icon: bankIbkIcon,
  },
  {
    id: 'nh',
    name: '농협은행',
    icon: bankNhIcon,
  },
  {
    id: 'woori',
    name: '우리은행',
    icon: bankWooriIcon,
  },
  {
    id: 'shinhan',
    name: '신한은행',
    icon: bankShinhanIcon,
  },
  {
    id: 'suhyup',
    name: '새마을금고',
    icon: bankSuhyupIcon,
  },
  {
    id: 'kakao',
    name: '카카오뱅크',
    icon: bankKakaoIcon,
  },
  {
    id: 'toss',
    name: '토스뱅크',
    icon: bankTossIcon,
  },
  {
    id: 'hana',
    name: '하나은행',
    icon: bankHanaIcon,
  },
  {
    id: 'sc',
    name: 'SC제일은행',
    icon: bankScIcon,
  },
  {
    id: 'kbank',
    name: '케이뱅크',
    icon: bankKbankIcon,
  },
  {
    id: 'postoffice',
    name: '우체국',
    icon: bankPostofficeIcon,
  },
  {
    id: 'kdb',
    name: '산업은행',
    icon: bankKdbIcon,
  },
  {
    id: 'bnk',
    name: '부산은행',
    icon: bankBnkIcon,
  },
  {
    id: 'fsb',
    name: '경남은행',
    icon: bankFsbIcon,
  },
  {
    id: 'jb',
    name: '전북은행',
    icon: bankJbIcon,
  },
  {
    id: 'citi',
    name: '씨티은행',
    icon: bankCitiIcon,
  },
  {
    id: 'kfcc',
    name: '새마을금고중앙회',
    icon: bankKfccIcon,
  },
  {
    id: 'ncufk',
    name: '신협중앙회',
    icon: bankNcufkIcon,
  },
];

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
