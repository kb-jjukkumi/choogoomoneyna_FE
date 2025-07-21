<template>
  <div class="flex justify-center">
    <div class="bg-ivory flex flex-col gap-5">
      <!-- 타이틀 -->
      <div class="flex font-bold text-xl justify-center">회원가입</div>

      <!-- 입력 폼 -->
      <form class="flex flex-col gap-8 w-full" @submit.prevent="join">
        <div class="flex flex-col gap-3">
          <div class="flex flex-col">
            <label for="name" class="block mb-1 font-bold">닉네임</label>
            <div class="flex gap-3">
              <input
                v-model="member.name"
                id="name"
                type="text"
                placeholder="한글,영문,숫자 2~10자리"
                class="border-2 border-limegreen-500 flex-2 w-full rounded-lg bg-white px-3 py-3"
              />
              <button
                class="flex-1 w-full text-white bg-limegreen-500 rounded-lg"
              >
                중복 확인
              </button>
            </div>
          </div>
          <p
            class="h-3 text-xs"
            :class="errorMessage ? 'text-red-500' : 'text-transparent'"
          >
            {{ errorMessage }}
          </p>
        </div>

        <div>
          <label for="email" class="mb-1 block font-bold">이메일</label>
          <div class="flex flex-col gap-2">
            <div class="flex gap-3">
              <input
                v-model="member.email"
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                class="border-2 border-limegreen-500 flex-2 w-full rounded-lg bg-white px-3 py-3"
              />
              <button
                class="flex-1 w-full text-white font-thin bg-limegreen-500 rounded-lg"
              >
                인증 요청
              </button>
            </div>
            <div class="flex gap-3">
              <input
                v-model="member.email"
                id="email"
                type="email"
                placeholder="인증번호를 입력해주세요."
                class="border-2 border-limegreen-500 flex-2 w-full rounded-lg bg-white px-3 py-3"
              />
              <button
                class="flex-1 w-full text-white font-thin bg-limegreen-500 rounded-lg"
              >
                확인
              </button>
            </div>
            <p
              class="h-3 text-xs"
              :class="errorMessage ? 'text-red-500' : 'text-transparent'"
            >
              {{ errorMessage }}
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div>
            <label for="password" class="mb-1 block font-bold">비밀번호</label>
            <input
              v-model="member.password"
              id="password"
              type="password"
              placeholder="비밀번호 입력"
              style="font-family: Arial, sans-serif"
              class="border-2 border-limegreen-500 flex-2 w-full rounded-lg bg-white px-3 py-3"
            />
          </div>
          <div>
            <label for="password2" class="mb-1 block font-bold"
              >비밀번호 확인</label
            >
            <input
              v-model="member.password2"
              id="password2"
              type="password"
              placeholder="비밀번호 확인"
              style="font-family: Arial, sans-serif"
              class="border-2 border-limegreen-500 flex-2 w-full rounded-lg bg-white px-3 py-3"
            />
          </div>
          <p
            class="h-3 text-xs"
            :class="errorMessage ? 'text-red-500' : 'text-transparent'"
          >
            {{ errorMessage }}
          </p>
        </div>
        <button
          type="submit"
          class="bg-limegreen-500 text-white mt-2 w-full rounded-lg py-3 text-lg font-normal"
        >
          다음
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const member = reactive({
  email: '',
  password: '',
  password2: '',
  name: '',
});

const join = () => {
  if (member.password != member.password2) {
    errorMessage.value = '비밀번호가 일치하지 않습니다.';
    return;
  }
  try {
    console.log(member);
  } catch {
    console.error(e);
  }
};

const errorMessage = ref('');
</script>
