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

const emit = defineEmits(['transferTypeSelected']);

// 상태값
const transferTypeSelected = ref('all');
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
const selectTransferType = type => {
  transferTypeSelected.value = type;
  emit('transferTypeSelected', type); // 영어로 emit
  isOpen.value = false;
};
</script>

<template>
  <template>
    <div class="filter_transerType" ref="dropdownRef">
      <!-- 드롭다운 버튼 -->
      <div class="btn_filter" @click="toggleDropdown">
        <!-- 선택된 항목 표시 (한글 라벨) -->
        <span>{{ TRANSFER_TYPE_MAP[selectedType] }}</span>
        <!-- ▼ 아이콘 -->
        <img :src="icon_toggle" alt="토글 아이콘" />
      </div>

      <!-- 드롭다운 목록 -->
      <ul v-if="isOpen" class="category_list">
        <li
          v-for="type in transferTypeList"
          :key="type"
          @click="selectFilter(type)"
          :class="{ selected: type === selectedType }"
        >
          {{ TRANSFER_TYPE_MAP[type] || type }}
        </li>
      </ul>
    </div>
  </template>
</template>

<style scoped>
/* 드롭다운 내부의 모든 요소에 공통 배경색 적용 */
.filter_category * {
  background-color: var(--white);
}

/* 전체 드롭다운 영역 */
.filter_category {
  position: relative;
  width: 160px;
  font-size: 14px;
}

/* 드롭다운 버튼 (카테고리 + ▼ 아이콘 포함) */
.filter_btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 15px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 드롭다운 버튼 hover 이벤트 */
.filter_btn:hover {
  background-color: #f9f9f9;
  border-color: #aaa;
}

/* ▼ 아이콘 */
.icon_triangle {
  font-size: 12px;
  color: var(--point-1-color);
}

/* 드롭다운 목록 */
.category_list {
  position: absolute;
  top: calc(100% + 4px); /* 버튼 바로 아래에 배치 */
  left: 0;
  width: 100%;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 220px;
  overflow-y: auto;
}

/* 드롭다운 항목 */
.category_list li {
  padding: 10px 14px;
  color: #333;
  cursor: pointer;
  transition: 0.2s;
}

/* 드롭다운 항목 hover 이벤트 */
.category_list li:hover {
  background-color: #f0f0f0;
}

/* 선택된 카테고리 항목 */
.category_list li.selected {
  background-color: rgba(42, 125, 92, 0.2);
  font-weight: bold;
  color: var(--point-1-color);
}
</style>
