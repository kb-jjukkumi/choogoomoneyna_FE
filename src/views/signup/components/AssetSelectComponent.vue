<template>
  <div class="min-h-screen bg-ivory flex flex-col">
    <!-- 상단 타이틀 -->
    <div class="w-full h-20 flex items-center justify-center">
      <p class="text-2xl text-limegreen-900 font-bold">은행 선택</p>
    </div>

    <!-- 은행 목록 -->
    <div class="flex-1 px-6 pb-24">
      <div class="space-y-4">
        <div
          v-for="bank in bankList"
          :key="bank.id"
          class="border-2 rounded-lg p-4 cursor-pointer transition-all"
          :class="
            selectedBank === bank.id
              ? 'border-limegreen-500 bg-limegreen-50'
              : 'border-gray-200 bg-white'
          "
          @click="selectBank(bank.id)"
        >
          <div class="flex items-center gap-4">
            <img :src="bank.icon" :alt="bank.name" class="w-10 h-10" />
            <span class="text-lg font-medium">{{ bank.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 버튼 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-lg">
      <button
        class="w-full bg-limegreen-500 text-limegreen-900 rounded-[10px] h-12 text-[22px]! disabled:opacity-50"
        :disabled="!selectedBank || isProcessing"
        @click="confirmSelection"
      >
        {{ isProcessing ? '처리 중...' : '선택' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { BANK_LIST } from '../../asset/constants/bankList';

// Props 정의
const props = defineProps({
  allData: { type: Object, required: true },
});

// Emit 정의
const emit = defineEmits(['next']);

// 전달받은 누적 데이터 확인
console.log('🏦 AssetSelect에서 받은 누적 데이터:', props.allData);

const selectedBank = ref(null);
const isProcessing = ref(false);

// 은행 목록 (임시로 몇 개만)
const bankList = ref([
  {
    id: 'kb',
    name: 'KB국민은행',
    icon: '/src/assets/img/icons/banks/bank_kb.png',
  },
  {
    id: 'shinhan',
    name: '신한은행',
    icon: '/src/assets/img/icons/banks/bank_shinhan.png',
  },
  {
    id: 'woori',
    name: '우리은행',
    icon: '/src/assets/img/icons/banks/bank_woori.png',
  },
  {
    id: 'hana',
    name: '하나은행',
    icon: '/src/assets/img/icons/banks/bank_hana.png',
  },
]);

const selectBank = bankId => {
  selectedBank.value = bankId;
};

const confirmSelection = () => {
  if (!selectedBank.value || isProcessing.value) return;

  isProcessing.value = true;
  console.log('선택된 은행:', selectedBank.value);

  // 선택된 은행 ID를 부모로 전달
  emit('next', selectedBank.value);

  // 처리 상태는 네비게이션으로 인해 자동으로 리셋됨
};
</script>
