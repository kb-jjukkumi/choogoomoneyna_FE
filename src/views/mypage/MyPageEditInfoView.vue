<template>
  <div class="relative flex justify-center w-full">
    <TopNavigation :show-back="true" :show-logo-text="false" />
    <div class="bg-ivory flex flex-col gap-7 w-full px-6">
      <!-- 타이틀 -->
      <div class="flex font-bold text-xl justify-center h-14 items-center">
        회원 정보 수정
      </div>

      <!-- 입력 폼 -->
      <form class="flex flex-col gap-6">
        <!--닉네임-->
        <div class="flex flex-col gap-2">
          <div class="flex flex-col">
            <label for="nickname" class="block mb-1 font-bold">닉네임</label>
            <div class="flex gap-3">
              <input
                id="nickname"
                type="text"
                placeholder="한글,영문,숫자 2~10자리"
                class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-lg bg-white px-3 py-3"
              />
              <button
                class="flex-1 w-full h-11 text-white bg-limegreen-500 rounded-lg"
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
        <div>
          <label for="email" class="mb-1 block font-bold">이메일</label>
          <div class="flex flex-col gap-2">
            <div class="flex gap-3">
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-lg bg-white px-3 py-3"
              />
              <button
                class="flex-1 w-full h-11 text-white font-thin bg-limegreen-500 rounded-lg"
                type="button"
              >
                인증 요청
              </button>
            </div>
            <p
              class="h-3 text-xs"
              :class="emailErrorMessage ? 'text-red-500' : 'text-transparent'"
            >
              {{ emailErrorMessage }}
            </p>
          </div>
        </div>
        <!--비밀번호-->
        <div class="flex flex-col gap-2">
          <div>
            <label for="password" class="mb-1 block font-bold">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호 입력"
              style="font-family: Arial, sans-serif"
              class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-[10px] bg-white px-3 py-3 placeholder:font-jua"
            />
          </div>
          <div>
            <label for="password2" class="mb-1 block font-bold"
              >비밀번호 확인</label
            >
            <input
              v-model="password2"
              id="password2"
              type="password"
              placeholder="비밀번호 확인"
              style="font-family: Arial, sans-serif"
              class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-[10px] bg-white px-3 py-3 placeholder:font-jua"
              @input="validatePassword"
            />
          </div>
          <p
            class="h-3 text-xs"
            :class="pwdErrorMessage ? 'text-red-500' : 'text-transparent'"
          >
            {{ pwdErrorMessage }}
          </p>
        </div>
        <button
          type="submit"
          class="bg-limegreen-500 text-white mt-2 w-full rounded-[10px] py-3 text-lg font-normal"
        >
          다음
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import TopNavigation from '@/components/TopNavigation.vue';
</script>
