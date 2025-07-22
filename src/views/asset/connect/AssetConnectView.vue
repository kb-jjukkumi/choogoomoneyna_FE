<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import TopNavigation from '@/components/TopNavigation.vue';

import { BANK_LIST } from '../constants/bankList';

const route = useRoute();

const bankId = computed(() => route.query.bankId);
const bankImg = computed(
  () => BANK_LIST.find(bank => bank.id === bankId.value).icon
);
</script>

<template>
  <div class="min-h-screen bg-ivory flex flex-col items-center pt-10">
    <TopNavigation :show-back="true" :show-logo-text="false" />
    <p class="text-center text-[25px]">자산 연동</p>
    <div class="flex flex-col items-center py-10">
      <img :src="bankImg" alt="은행로고" class="size-30" />
    </div>
    <form class="w-full flex flex-col gap-4">
      <div class="mb-8">
        <label class="block text-limegreen-900 font-extrabold text-[32px] mb-4"
          >아이디</label
        >
        <div class="relative">
          <img
            src="@/assets/img/icons/feature/icon_id.png"
            alt="아이디 입력"
            class="absolute left-7 top-1/2 -translate-y-1/2 w-8 h-8 opacity-40"
          />
          <input
            type="text"
            placeholder="아이디를 입력해주세요."
            class="w-full bg-limegreen-100 rounded-3xl px-16 py-7 text-limegreen-900 placeholder:text-limegreen-400 text-[28px] font-extrabold outline-none"
          />
        </div>
      </div>
      <div class="mb-8">
        <label class="block text-limegreen-900 font-extrabold text-[32px] mb-4"
          >비밀번호</label
        >
        <div class="relative">
          <img
            src="@/assets/img/icons/feature/icon_password.png"
            alt="비밀번호 입력"
            class="absolute left-7 top-1/2 -translate-y-1/2 w-8 h-8 opacity-40"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            class="w-full bg-limegreen-100 rounded-3xl px-16 py-7 text-limegreen-900 placeholder:text-limegreen-400 text-[28px] font-extrabold outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        class="w-full bg-limegreen-200 text-limegreen-900 rounded-xl py-3 mt-4 text-xl font-bold"
      >
        자산 연결
      </button>
    </form>
  </div>
</template>
