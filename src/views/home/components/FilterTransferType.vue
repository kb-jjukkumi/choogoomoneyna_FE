<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

import icon_toggle from '@/assets/img/icons/feature/icon_toggle.png';

// 영어 - 한글 매핑
const TRANSFER_TYPE_MAP = {
  all: '전체',
  income: '입금',
  expense: '출금',
};

// 드롭다운 항목 (영문 키 -> 한글로 변환되어 표시 )
const transferTypeList = ['all', 'income', 'expense'];

const emit = defineEmits(['selectedType']);

// 상태값
const selectedType = ref('all');
const isOpen = ref(false);
const dropdownRef = ref(null);

// 드롭다운 toggle
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// 외부 클릭 시 드롭다운 닫기
const clickOuterHandler = e => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', clickOuterHandler);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', clickOuterHandler);
});

// 항목 선택 시 처리
const selectType = type => {
  selectedType.value = type;
  emit('selectedType', type); // 영어로 emit
  isOpen.value = false;
};
</script>

<template>
  <div class="relative w-18 text-xs text-limegreen-700" ref="dropdownRef">
    <!-- 드롭다운 버튼 -->
    <div
      class="flex justify-between items-center gap-2 pl-4 pr-3 py-1 rounded-xl bg-ivory border-2 border-limegreen-500 cursor-pointer hover:bg-limegreen-100"
      @click="toggleDropdown"
    >
      <!-- 선택된 항목 표시 (한글 라벨) -->
      <span>{{ TRANSFER_TYPE_MAP[selectedType] }}</span>
      <!-- ▼ 아이콘 -->
      <img :src="icon_toggle" alt="토글 아이콘" class="size-2.5" />
    </div>

    <!-- 드롭다운 목록 -->
    <ul
      v-if="isOpen"
      class="absolute top-full mt-0.5 left-0 w-full bg-ivory text-limegreen-700 border-2 border-limegreen-500 rounded-lg shadow z-50 overflow-y-auto"
    >
      <li
        v-for="transferType in transferTypeList"
        :key="transferType"
        @click="selectType(transferType)"
        :class="[
          'px-4 py-2 cursor-pointer hover:bg-limegreen-100 transition',
          {
            ' font-bold text-green': transferType === selectedType,
          },
        ]"
      >
        {{ TRANSFER_TYPE_MAP[transferType] || transferType }}
      </li>
    </ul>
  </div>
</template>
