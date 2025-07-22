<template>
  <div
    class="min-h-screen bg-ivory flex flex-col items-center justify-center px-4 relative"
  >
    <TopNavigation
      :show-back="true"
      :show-logo-text="true"
      :logo-text="'자산 연동'"
    />
    <div class="flex flex-col items-center py-10">
      <img :src="bankImg" alt="은행로고" class="size-30" />
    </div>

    <form class="w-full flex flex-col gap-4" @submit.prevent="handleSubmit">
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
            v-model="id"
            placeholder="아이디를 입력해주세요."
            class="w-full bg-limegreen-100 rounded-[10px] px-16 h-11 text-limegreen-900 placeholder:text-gray-200 placeholder:font-jua font-spoqa! outline-none"
          />
        </div>
      </div>
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
            v-model="password"
            placeholder="비밀번호를 입력해주세요."
            class="w-full bg-limegreen-100 rounded-[10px] px-16 h-11 text-limegreen-900 placeholder:text-gray-200 placeholder:font-jua font-spoqa! outline-none"
          />
        </div>
      </div>
      <div class="w-full mt-10">
        <button
          type="submit"
          class="w-full bg-limegreen-500! h-14! text-limegreen-900! rounded-[10px] py-3 mt-4 text-2xl!"
        >
          자산 연결
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import TopNavigation from '@/components/TopNavigation.vue';

import { BANK_LIST } from '../constants/bankList';

const route = useRoute();

const id = ref('');
const password = ref('');

const bankId = computed(() => route.query.bankId);
const bankImg = computed(
  () => BANK_LIST.find(bank => bank.id === bankId.value).icon
);

const handleSubmit = () => {
  console.log(`id: ${id.value}, password: ${password.value}`);
};
</script>
