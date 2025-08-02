<template>
  <div class="relative flex justify-center w-full">
    <TopNavigation :show-back="true" :show-logo-text="false" />
    <div class="bg-ivory flex flex-col gap-7 w-full px-6">
      <!-- 타이틀 -->
      <div class="flex font-bold text-xl justify-center h-14 items-center">
        회원 정보 수정
      </div>

      <!-- 입력 폼 -->
      <form class="flex flex-col gap-5" @submit.prevent="handleUpdate">
        <!--닉네임-->
        <div class="flex flex-col gap-2">
          <div class="flex flex-col">
            <label for="nickname" class="block mb-1 font-bold">닉네임</label>
            <div class="flex gap-3">
              <input
                v-model="newNickname"
                id="nickname"
                type="text"
                placeholder="한글,영문,숫자 2~10자리"
                class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-[10px] bg-white px-3 py-3"
                @input="onNicknameInput"
              />
              <button
                class="flex-1 w-full h-11 text-white bg-limegreen-500 rounded-[10px] disabled:opacity-50"
                type="button"
                @click="checkName"
                :disabled="isNameChecking"
              >
                {{ isNameChecking ? '확인 중...' : '중복 확인' }}
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
            v-model="member.email"
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
              v-model="currentPassword"
              id="password"
              type="password"
              placeholder="현재 비밀번호 입력"
              style="font-family: Arial, sans-serif"
              class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-[10px] bg-white px-3 py-3 placeholder:font-jua"
              @input="validateCurrentPassword"
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
            <label for="newPassword" class="mb-1 block font-bold"
              >새 비밀번호</label
            >
            <input
              v-model="newPassword"
              id="newPassword"
              type="password"
              placeholder="새 비밀번호를 입력해주세요."
              style="font-family: Arial, sans-serif"
              class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-[10px] bg-white px-3 py-3 placeholder:font-jua"
            />
          </div>
          <div>
            <label for="newPassword2" class="my-1 block font-bold"
              >새 비밀번호 확인</label
            >
            <input
              v-model="newPassword2"
              id="newPassword2"
              type="password"
              placeholder="새 비밀번호를 한 번 더 입력해주세요"
              style="font-family: Arial, sans-serif"
              class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-[10px] bg-white px-3 py-3 placeholder:font-jua"
              @input="validateNewPassword"
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
      @confirm="submitUpdate"
    />
    <AlertModal
      v-if="showAlertModal"
      title="회원 정보 수정"
      message="회원 정보가 수정되었습니다."
      @close="router.push('/mypage')"
    />
    <AlertModal
      v-if="showErrorModal"
      title="회원 정보 수정"
      message="회원 정보가 수정에 실패했습니다. 다시 시도해주세요."
      @close="showErrorModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

import authApi from '@/api/authApi';
import axiosInstance from '@/api/axios';
import AlertModal from '@/components/AlertModal.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import router from '@/router';

const member = reactive({
  choogoomiName: '',
  nickname: '',
  userScore: null,
  userRanking: null,
  isLevelUp: false,
});

const editedProfile = reactive({
  nickname: '',
  password: '',
  newPassword: '',
});

const newNickname = ref('');
const currentPassword = ref('');
const newPassword = ref(''); //비밀번호 확인
const newPassword2 = ref(''); //비밀번호 확인

//항목별 표시할 에러메세지
const nameErrorMessage = ref('');
const CurrnetPwdErrorMessage = ref('');
const NewPwdErrorMessage = ref('');

//모달창 관리
const showConfirmModal = ref(false);
const showAlertModal = ref(false);
const showErrorModal = ref(false);

//항목별 인증 여부 확인
const isNameChecked = ref(false);
const isCurrnetPwdChecked = ref(false);
const isNewPwdChecked = ref(false);

// 로딩 상태 관리
const isNameChecking = ref(false);

//닉네임이 다시 입력되면 중복 체크 상태 초기화
const onNicknameInput = () => {
  isNameChecked.value = false;
  nameErrorMessage.value = '';
};

//닉네임 중복 체크
const checkName = async () => {
  if (isNameChecking.value) return; // 중복 요청 방지

  if (!newNickname.value.trim()) {
    nameErrorMessage.value = '닉네임을 입력하세요.';
    isNameChecked.value = false;
    return;
  }

  if (newNickname.value === member.nickname) {
    nameErrorMessage.value = '사용 가능한 닉네임입니다.';
    isNameChecked.value = true; // 확인된 걸로 간주
    return;
  }

  isNameChecking.value = true;
  try {
    const result = await authApi.checkName(newNickname.value);

    if (result) {
      nameErrorMessage.value = '이미 사용중인 닉네임 입니다.';
      isNameChecked.value = false;
    } else {
      nameErrorMessage.value = '사용 가능한 닉네임 입니다.';
      isNameChecked.value = true;
    }
  } catch (error) {
    nameErrorMessage.value = '중복 확인 중 오류가 발생했습니다.';
    isNameChecked.value = false;
  } finally {
    isNameChecking.value = false;
  }
};

//현재 비밀번호 일치 여부 확인
const validateCurrentPassword = () => {
  if (!currentPassword.value.trim()) {
    CurrnetPwdErrorMessage.value = '비밀번호를 입력해주세요.';
    return false;
  }
  CurrnetPwdErrorMessage.value = '';
  isCurrnetPwdChecked.value = true;
  return true;
};

//새 비밀번호 일치 여부 확인
const validateNewPassword = () => {
  if (!newPassword.value.trim() || !newPassword.value.trim()) {
    NewPwdErrorMessage.value = '비밀번호를 입력해주세요.';
    return false;
  }
  if (newPassword.value !== newPassword2.value) {
    NewPwdErrorMessage.value = '비밀번호가 일치하지 않습니다.';
    return false;
  }
  NewPwdErrorMessage.value = '';
  isNewPwdChecked.value = true;
  return true;
};

//회원 정보 수정 처리
const handleUpdate = async () => {
  let hasError = false;

  if (!isNameChecked.value) {
    nameErrorMessage.value = '닉네임 중복확인을 해주세요.';
    hasError = true;
  }

  if (!isCurrnetPwdChecked.value) {
    hasError = true;
  }

  if (!isNewPwdChecked.value) {
    NewPwdErrorMessage.value = '비밀번호가 일치하지 않습니다.';
    hasError = true;
  }

  if (hasError) return;

  try {
    editedProfile.nickname = newNickname.value;
    editedProfile.password = currentPassword.value;
    editedProfile.newPassword = newPassword.value;
  } finally {
    console.log(member);
    showConfirmModal.value = true;
  }
};

const submitUpdate = async () => {
  try {
    console.log(editedProfile);
    await axiosInstance.put('/api/users/update', editedProfile);
    showConfirmModal.value = false;
    showAlertModal.value = true;
  } catch (error) {
    showConfirmModal.value = false;
    console.error('회원 정보 수정 실패:', error);
  }
};

onMounted(async () => {
  try {
    const { data } = await axiosInstance.get('/api/users/main-profile');
    console.log(data);

    //userInfo에 저장
    Object.assign(member, data);
    newNickname.value = member.nickname;
    console.log(member);
  } catch (error) {
    console.error('회원 정보 불러오기 실패');
  }
});
</script>
