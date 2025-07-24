<template>
  <!-- 화면 전체 배경 -->
  <div
    class="min-h-screen bg-ivory flex flex-col items-center justify-center px-4 relative"
  >
    <!-- 상단 네비게이션 -->
    <TopNavigation
      :show-back="true"
      :show-logo-text="true"
      :logo-text="'자산 연동'"
    />
    <!-- 은행 아이콘 -->
    <BankIcon :assets="bankImg" :alt="bankName" :size="20" class="mb-4" />
    <!-- 자산 연동 폼 -->
    <form class="w-full flex flex-col gap-4" @submit.prevent="handleSubmit">
      <!-- 아이디 입력 -->
      <div class="flex flex-col gap-2">
        <label class="text-limegreen-900 text-[16px]">아이디</label>
        <div class="relative">
          <img
            src="@/assets/img/icons/feature/icon_id.png"
            alt="아이디 입력"
            class="absolute left-7 top-1/2 -translate-y-1/2 size-5"
          />
          <input
            type="text"
            v-model="userBankId"
            placeholder="아이디를 입력해주세요."
            class="w-full bg-limegreen-100 rounded-[10px] px-16 h-11 text-limegreen-900 placeholder:text-gray-200 placeholder:font-jua font-spoqa! outline-none"
          />
        </div>
      </div>
      <!-- 비밀번호 입력 -->
      <div class="flex flex-col gap-2">
        <label class="text-limegreen-900 text-[16px]">비밀번호</label>
        <div class="relative">
          <img
            src="@/assets/img/icons/feature/icon_password.png"
            alt="비밀번호 입력"
            class="absolute left-7 top-1/2 -translate-y-1/2 size-5"
          />
          <input
            type="password"
            v-model="userBankPassword"
            placeholder="비밀번호를 입력해주세요."
            class="w-full bg-limegreen-100 rounded-[10px] px-16 h-11 text-limegreen-900 placeholder:text-gray-200 placeholder:font-jua font-spoqa! outline-none"
          />
        </div>
      </div>
      <!-- 자산 연동 버튼 -->
      <div class="w-full mt-10">
        <button
          type="submit"
          :disabled="isInputEmpty"
          class="w-full bg-limegreen-500! h-14! text-limegreen-900! rounded-[10px] py-3 mt-4 text-2xl! disabled:opacity-50"
        >
          자산 연결
        </button>
      </div>
    </form>
  </div>
  <!-- 조건에 따라서 자산 연동 결과 모달 표시 -->
  <ConnectModal
    v-if="isModalOpen"
    :modal-type="modalType"
    :title="modalType === false ? '자산 연동 실패' : '자산 연동 성공!'"
    :message="
      modalType === false
        ? '다시 연동을 시도해 주세요.'
        : `${bankName} 자산 연동에 성공했습니다!`
    "
    @close="isModalOpen = false"
  />
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import axiosInstance from '@/api/axios';
import TopNavigation from '@/components/TopNavigation.vue';

import { BANK_LIST } from '../constants/bankList';
import BankIcon from './components/BankIcon.vue';
import ConnectModal from './components/ConnectModal.vue';

onMounted(() => {
  console.log(bankId.value);
});

const route = useRoute();
const userBankId = ref('');
const userBankPassword = ref('');
const isInputEmpty = computed(
  () => !userBankId.value || !userBankPassword.value
);

// 은행 아이콘 관련 데이터
const bankId = computed(() => route.query.bankId);
const bankImg = computed(
  () => BANK_LIST.find(bank => bank.bankId === bankId.value).icon
);
const bankName = computed(
  () => BANK_LIST.find(bank => bank.bankId === bankId.value).name
);

// 모달 관련 데이터
const isModalOpen = ref(false);
const modalType = ref(true);

const connectAsset = async () => {
  try {
    const response = await axiosInstance.post('/api/codef/account/add', {
      bankId: bankId.value,
      userBankId: userBankId.value,
      userBankPassword: userBankPassword.value,
    });
    modalType.value = true;
    isModalOpen.value = true;
  } catch {
    modalType.value = false;
    isModalOpen.value = true;
  }
};

// 자산 연동 버튼 클릭 시 모달 표시
const handleSubmit = () => {
  connectAsset();
};
</script>
