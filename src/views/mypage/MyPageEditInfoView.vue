<template>
  <div class="relative flex justify-center w-full">
    <TopNavigation :show-back="true" :show-logo-text="false" />
    <div class="bg-ivory flex flex-col gap-7 w-full px-6">
      <!-- 타이틀 -->
      <div class="flex font-bold text-xl justify-center h-14 items-center">
        회원 정보 수정
      </div>

      <!-- 입력 폼 -->
      <form class="flex flex-col gap-5">
        <!--닉네임-->
        <div class="flex flex-col gap-2">
          <div class="flex flex-col">
            <label for="nickname" class="block mb-1 font-bold">닉네임</label>
            <div class="flex gap-3">
              <input
                id="nickname"
                type="text"
                placeholder="한글,영문,숫자 2~10자리"
                class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-[10px] bg-white px-3 py-3"
              />
              <button
                class="flex-1 w-full h-11 text-white bg-limegreen-500 rounded-[10px]"
                type="button"
              >
                중복 확인
              </button>
            </div>
          </div>
          <p
            class="h-3 text-xs"
            :class="nameErrorMessage ? 'text-red-500' : 'text-transparent'"
          >
            {{ nameErrorMessage }}
          </p>
        </div>

        <!--이메일-->
        <div class="mb-5">
          <label for="email" class="mb-1 block font-bold">이메일</label>
          <input
            v-model="email"
            id="email"
            type="email"
            class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-lg bg-limegreen-100 px-3 py-3 text-limegreen-700"
            disabled
          />
        </div>
        <!--현재 비밀번호-->
        <div class="flex flex-col gap-2">
          <div>
            <label for="password" class="mb-1 block font-bold"
              >현재 비밀번호</label
            >
            <input
              id="password"
              type="password"
              placeholder="현재 비밀번호 입력"
              style="font-family: Arial, sans-serif"
              class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-[10px] bg-white px-3 py-3 placeholder:font-jua"
            />
          </div>

          <p
            class="h-3 text-xs"
            :class="
              CurrnetPwdErrorMessage ? 'text-red-500' : 'text-transparent'
            "
          >
            {{ CurrnetPwdErrorMessage }}
          </p>
        </div>
        <!--새 비밀번호-->
        <div class="flex flex-col gap-2">
          <div>
            <label for="password" class="mb-1 block font-bold"
              >새 비밀번호</label
            >
            <input
              id="password"
              type="password"
              placeholder="새 비밀번호를 입력해주세요."
              style="font-family: Arial, sans-serif"
              class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-[10px] bg-white px-3 py-3 placeholder:font-jua"
            />
          </div>
          <div>
            <label for="password2" class="my-1 block font-bold"
              >새 비밀번호 확인</label
            >
            <input
              v-model="password2"
              id="password2"
              type="password"
              placeholder="새 비밀번호를 한 번 더 입력해주세요"
              style="font-family: Arial, sans-serif"
              class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-[10px] bg-white px-3 py-3 placeholder:font-jua"
              @input="validatePassword"
            />
          </div>
          <p
            class="h-3 text-xs"
            :class="NewPwdErrorMessage ? 'text-red-500' : 'text-transparent'"
          >
            {{ NewPwdErrorMessage }}
          </p>
        </div>
        <button
          type="submit"
          class="bg-limegreen-500 text-white mt-2 w-full rounded-[10px] py-3 text-lg font-normal"
        >
          수정 완료
        </button>
      </form>
    </div>
    <ConfirmModal
      v-if="showConfirmModal"
      title="회원 정보 수정"
      message="회원 정보를 수정하시겠습니까?"
      :cancelBtn="'취소'"
      :confirmBtn="'확인'"
      @cancel="showConfirmModal = false"
      @confirm="showAlertModal = true"
    />
    <AlertModal
      v-if="showAlertModal"
      title="회원 정보 수정"
      message="회원 정보가 수정되었습니다."
      @close="router.push('/mypage')"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import AlertModal from '@/components/AlertModal.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import router from '@/router';

const email = ref('lllll@ff'); //이메일 표시 테스트용

//항목별 표시할 에러메세지
const nameErrorMessage = ref('');
const CurrnetPwdErrorMessage = ref('');
const NewPwdErrorMessage = ref('');

const showConfirmModal = ref(true);
const showAlertModal = ref(false);
</script>
