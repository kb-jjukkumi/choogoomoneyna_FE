<template>
  <div class="flex justify-center">
    <div class="bg-ivory flex flex-col gap-5">
      <!-- 타이틀 -->
      <div class="flex font-bold text-xl justify-center">회원가입</div>

      <!-- 입력 폼 -->
      <form class="flex flex-col gap-8 w-full" @submit.prevent="join">
        <div class="flex flex-col gap-2">
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
                @click="checkName"
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

        <div>
          <label for="email" class="mb-1 block font-bold">이메일</label>
          <div class="flex flex-col gap-2">
            <div class="flex gap-3">
              <input
                v-model="email.email"
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                class="border-2 border-limegreen-500 flex-2 w-full rounded-lg bg-white px-3 py-3"
              />
              <button
                class="flex-1 w-full text-white font-thin bg-limegreen-500 rounded-lg"
                @click="send"
                type="button"
              >
                인증 요청
              </button>
            </div>
            <div class="flex gap-3">
              <input
                v-model="verifyEmail.code"
                id="email-code"
                type="text"
                placeholder="인증번호를 입력해주세요."
                class="border-2 border-limegreen-500 flex-2 w-full rounded-lg bg-white px-3 py-3"
              />
              <button
                class="flex-1 w-full text-white font-thin bg-limegreen-500 rounded-lg"
                @click="verify"
                type="button"
              >
                확인
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
              v-model="password2"
              id="password2"
              type="password"
              placeholder="비밀번호 확인"
              style="font-family: Arial, sans-serif"
              class="border-2 border-limegreen-500 flex-2 w-full rounded-lg bg-white px-3 py-3"
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
          class="bg-limegreen-500 text-white mt-2 w-full rounded-lg py-3 text-lg font-normal"
          @click="join"
        >
          다음
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

import authApi from '@/api/authApi';

//항목별 표시할 에러메세지
const nameErrorMessage = ref('');
const emailErrorMessage = ref('');
const pwdErrorMessage = ref('');

const password2 = ref(''); //비밀번호 확인

//항목별 인증 여부 확인
const isNameChecked = ref(false);
const isEmailChecked = ref(false);
const isPwdChecked = ref(false);

//회원가입 dto 항목
const member = reactive({
  email: '',
  password: '',
  name: '',
});

//이메일 전송용
const email = reactive({
  email: '',
});

//이메일 인증코드 확인용
const verifyEmail = reactive({
  email: email.email,
  code: '',
});

//닉네임 중복 체크
const checkName = async () => {
  if (!member.name.trim()) {
    nameErrorMessage.value = '닉네임을 입력하세요.';
    isNameChecked.value = false;
    return;
  }

  const result = await authApi.checkName(member.name);

  if (result) {
    nameErrorMessage.value = '이미 사용중인 닉네임 입니다.';
    isNameChecked.value = false;
  } else {
    nameErrorMessage.value = '사용 가능한 닉네임 입니다.';
    isNameChecked.value = true;
  }
};

//이메일 인증번호 전송
const send = async () => {
  if (!email.email.trim()) {
    emailErrorMessage.value = '이메일을 입력해주세요.';
    return;
  } else {
    await authApi.sendCode(email);
    return;
  }
};

//이메일 인증번호 확인
const verify = async () => {
  if (!verifyEmail.code.trim()) {
    emailErrorMessage.value = '인증번호를 입력해주세요.';
    return;
  }

  const verifyPayload = {
    email: email.email,
    code: verifyEmail.code,
  };

  try {
    const result = await authApi.verifyCode(verifyPayload);

    if (result) {
      emailErrorMessage.value = '인증이 완료되었습니다.';
      isEmailChecked.value = true;
    } else {
      emailErrorMessage.value = '인증번호가 올바르지 않습니다.';
      isNameChecked.value = false;
    }
  } catch (e) {
    console.error(e);
    isEmailChecked.value = false;
    emailErrorMessage.value = '인증번호가 올바르지 않습니다.';
  }
};

//비밀번호 일치 여부 확인
const validatePassword = () => {
  if (!member.password.trim() || !password2.value.trim()) {
    pwdErrorMessage.value = '비밀번호를 입력해주세요.';
    return false;
  }
  if (member.password !== password2.value) {
    pwdErrorMessage.value = '비밀번호가 일치하지 않습니다.';
    return false;
  }
  pwdErrorMessage.value = '';
  isPwdChecked.value = true;
  return true;
};

//회원가입 처리
const join = () => {
  let hasError = false;

  if (!isNameChecked.value) {
    nameErrorMessage.value = '닉네임 중복확인을 해주세요.';
    hasError = true;
  }

  if (!isEmailChecked.value) {
    emailErrorMessage.value = '이메일 인증을 해주세요.';
    hasError = true;
  }

  if (!isPwdChecked.value) {
    pwdErrorMessage.value = '비밀번호가 일치하지 않습니다.';
    hasError = true;
  }

  if (hasError) return;

  // 이메일 필드에 인증된 이메일 넣기
  member.email = email.email;

  try {
    console.log('회원가입 정보:', member);
  } catch (e) {
    console.error(e);
  }
};
</script>
