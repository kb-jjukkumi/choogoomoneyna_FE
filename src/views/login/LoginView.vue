<template>
  <div class="flex h-screen justify-center">
    <div class="bg-ivory flex w-[390px] flex-col gap-8 px-4">
      <!-- 동물 캐릭터 이미지 -->
      <div class="mt-8 flex justify-center">
        <img src="@/assets/img/loginLogo.png" alt="logo" />
      </div>
      <!-- 타이틀 -->
      <div class="flex flex-col items-center">
        <span class="font-kb-bold mb-2 text-2xl font-bold tracking-widest"
          >CHOOGOOMONEYNNA!</span
        >
      </div>
      <!-- 입력 폼 -->
      <form class="flex flex-col gap-4">
        <div>
          <label for="email" class="font-kb-bold mb-1 block font-bold"
            >이메일</label
          >
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="이메일 입력"
            class="border-gray font-kb-regular focus:ring-limeGreen w-full rounded-lg border bg-white px-4 py-3 font-normal focus:ring-2 focus:outline-none"
          />
        </div>
        <div>
          <label for="password" class="font-kb-bold mb-1 block font-bold"
            >비밀번호</label
          >
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="비밀번호 입력"
            class="border-gray font-kb-regular focus:ring-limeGreen w-full rounded-lg border bg-white px-4 py-3 font-normal focus:ring-2 focus:outline-none"
          />
        </div>
        <button
          @click="handleLogin"
          type="submit"
          class="bg-gray font-kb-bold mt-2 w-full rounded-lg py-3 text-lg font-bold text-white"
        >
          로그인
        </button>
      </form>
      <!-- 하단 버튼 -->
      <div class="mt-2 flex gap-2">
        <button
          class="font-kb-bold flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#ffe812] py-3 text-base font-bold text-black shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            class="h-5 w-5"
          >
            <path
              d="M12 2C6.477 2 2 5.805 2 10.111c0 2.7 2.09 5.06 5.25 6.44-.22.77-.8 2.8-.91 3.25 0 0-.02.16.08.22.1.06.23-.02.23-.02.3-.04 3.37-2.23 4.13-2.77.41.04.83.06 1.25.06 5.523 0 10-3.805 10-8.111C22 5.805 17.523 2 12 2z"
            />
          </svg>
          카카오 로그인
        </button>
        <button
          class="text-gray font-kb-bold flex-1 rounded-lg bg-[#e3eac9] py-3 text-base font-bold"
        >
          회원가입
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log(email.value, password.value);
};
</script>
