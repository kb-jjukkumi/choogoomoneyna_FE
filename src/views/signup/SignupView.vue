<template>
  <div class="flex justify-center w-full">
    <div class="bg-ivory flex flex-col gap-7 w-full px-4">
      <!-- 타이틀 -->
      <div class="flex font-bold text-xl justify-center">회원가입</div>

      <!-- 입력 폼 -->
      <form class="flex flex-col gap-6" @submit.prevent="join">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col">
            <label for="nickname" class="block mb-1 font-bold">닉네임</label>
            <div class="flex gap-3">
              <input
                v-model="member.nickname"
                id="nickname"
                type="text"
                placeholder="한글,영문,숫자 2~10자리"
                class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-lg bg-white px-3 py-3"
              />
              <button
                class="flex-1 w-full h-11 text-white bg-limegreen-500 rounded-lg"
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
                class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-lg bg-white px-3 py-3"
              />
              <button
                class="flex-1 w-full h-11 text-white font-thin bg-limegreen-500 rounded-lg"
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
                class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-lg bg-white px-3 py-3"
              />
              <button
                class="flex-1 w-full h-11 text-white font-thin bg-limegreen-500 rounded-lg"
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
              class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-lg bg-white px-3 py-3"
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
              class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-lg bg-white px-3 py-3"
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
        >
          다음
        </button>
      </form>
    </div>
    <AlertModal
      v-if="isSendEmailSuccess"
      title="이메일 인증"
      :message="
        isSendEmailSuccess
          ? '인증 이메일이 발송되었습니다.'
          : '다시 시도해주세요!'
      "
      @close="isSendEmailSuccess = false"
    />
    <AlertModal
      v-if="isSignupSuccess"
      title="회원가입"
      :message="
        isSignupSuccess ? '회원가입이 완료되었습니다.' : '다시 시도해주세요!'
      "
      @close="goToLogin"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import authApi from '@/api/authApi';
import AlertModal from '@/components/AlertModal.vue';

const router = useRouter();

//항목별 표시할 에러메세지
const nameErrorMessage = ref('');
const emailErrorMessage = ref('');
const pwdErrorMessage = ref('');

const password2 = ref(''); //비밀번호 확인

//항목별 인증 여부 확인
const isNameChecked = ref(false);
const isEmailChecked = ref(false);
const isPwdChecked = ref(false);

const isSendEmailSuccess = ref(false);
const isSignupSuccess = ref(false);

//회원가입 dto 항목
const member = reactive({
  profileImage: null,
  email: '',
  password: '',
  nickname: '',
  choogooMi: 'A',
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
  if (!member.nickname.trim()) {
    nameErrorMessage.value = '닉네임을 입력하세요.';
    isNameChecked.value = false;
    return;
  }

  const result = await authApi.checkName(member.nickname);

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
    isSendEmailSuccess.value = true;
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
const join = async () => {
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
    // 실제 회원가입 API 호출
    const signupData = {
      profileImage: null,
      email: member.email,
      password: member.password,
      nickname: member.nickname,
      choogooMi: member.choogooMi,
    };

    await authApi.signup(signupData);

    // 회원가입 성공 시 로그인 페이지로 이동
    isSignupSuccess.value = true;
  } catch (error) {
    isSignupSuccess.value = false;
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>
