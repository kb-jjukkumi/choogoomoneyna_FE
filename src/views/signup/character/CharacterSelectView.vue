<template>
  <div class="bg-ivory flex flex-col items-center">
    <p
      class="w-full h-20 flex items-center justify-center text-2xl text-limegreen-900"
    >
      추구미 선택
    </p>
    <div class="min-w-xs mt-10">
      <!-- 첫 번째 행: 2개 -->
      <div class="grid grid-cols-2 gap-x-8 gap-y-8 mb-8">
        <CharacterCard
          v-for="character in CHOOGOOMI_CHARACTERS.slice(0, 2)"
          :key="character.choogoomiId"
          :img="character.img"
          :label="character.label"
          :selected="selected === character.choogoomiId"
          @click="select(character.choogoomiId)"
        />
      </div>

      <!-- 두 번째 행: 1개 (가운데 정렬) -->
      <div class="flex justify-center mb-8">
        <CharacterCard
          :img="CHOOGOOMI_CHARACTERS[2].img"
          :label="CHOOGOOMI_CHARACTERS[2].label"
          :selected="selected === CHOOGOOMI_CHARACTERS[2].choogoomiId"
          @click="select(CHOOGOOMI_CHARACTERS[2].choogoomiId)"
        />
      </div>

      <!-- 세 번째 행: 2개 -->
      <div class="grid grid-cols-2 gap-x-8 gap-y-8">
        <CharacterCard
          v-for="character in CHOOGOOMI_CHARACTERS.slice(3, 5)"
          :key="character.choogoomiId"
          :img="character.img"
          :label="character.label"
          :selected="selected === character.choogoomiId"
          @click="select(character.choogoomiId)"
        />
      </div>
    </div>
    <CharacterDetailModal
      v-if="isModalOpen"
      :selected-character="selectedCharacter"
      @close="isModalOpen = false"
      @select="confirmSelection"
    />
    <AlertModal
      v-if="isErrorModalOpen"
      title="오류"
      message="회원가입 중 문제가 발생했습니다. 다시 시도해주세요."
      @close="goToSignup"
    />
    <AlertModal
      v-if="isSuccessModalOpen"
      title="회원가입"
      message="회원가입이 완료되었습니다."
      @close="goToHome"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import authApi from '@/api/authApi';
import AlertModal from '@/components/AlertModal.vue';

import { CHOOGOOMI_CHARACTERS } from '../constants/ChoogoomiList';
import CharacterCard from './components/CharacterCard.vue';
import CharacterDetailModal from './components/CharacterDetailModal.vue';

const router = useRouter();
const selected = ref(null);
const isModalOpen = ref(false);
const isErrorModalOpen = ref(false);
const isSuccessModalOpen = ref(false);

// SignupView에서 전달받은 회원가입 데이터
const signupData = ref(null);
const profileImage = ref(null);

onMounted(() => {
  // 전달받은 state 데이터 확인
  if (history.state && history.state.signupData) {
    signupData.value = history.state.signupData;
    console.log('전달받은 회원가입 데이터:', signupData.value);
  } else {
    isErrorModalOpen.value = true;
    // 데이터가 없으면 회원가입 페이지로 리다이렉트
    router.push('/signup');
  }
});

const select = idx => {
  selected.value = idx;
  const selectedChar = CHOOGOOMI_CHARACTERS.find(
    char => char.choogoomiId === idx
  );

  // 전달받은 회원가입 데이터에 선택한 캐릭터 정보 추가
  if (signupData.value) {
    signupData.value.choogooMi = selectedChar.choogoomiId;
    profileImage.value = selectedChar.img;
    console.log('최종 회원가입 데이터:', signupData.value);
  }

  isModalOpen.value = true;
};

// 이미지 경로를 File 객체로 변환하는 함수
const imagePathToFile = async imagePath => {
  try {
    // 이미지 fetch
    const response = await fetch(imagePath);
    const blob = await response.blob();

    // 파일명 추출 (예: A.png)
    const filename = imagePath.split('/').pop();

    // File 객체 생성
    const file = new File([blob], filename, { type: blob.type });
    return file;
  } catch (error) {
    console.error('이미지 파일 변환 실패:', error);
    return null;
  }
};

// 캐릭터 선택 확정 및 회원가입 API 호출
const confirmSelection = async () => {
  try {
    if (signupData.value) {
      const profileImageFile = await imagePathToFile(profileImage.value);
      signupData.value.profileImage = profileImageFile;
      if (!signupData.value.profileImage) {
        return;
      }
      await authApi.signup(signupData.value);
      // 회원가입 성공 시 성공 모달 표시
      isSuccessModalOpen.value = true;
    }
  } catch (error) {
    console.error('회원가입 실패:', error);
    // 에러 처리 - 에러 모달 표시
    isErrorModalOpen.value = true;
  } finally {
    isModalOpen.value = false;
  }
};

// 선택된 캐릭터 정보
const selectedCharacter = computed(() => {
  return selected.value !== null
    ? CHOOGOOMI_CHARACTERS.find(char => char.choogoomiId === selected.value)
    : null;
});

const goToSignup = () => {
  isErrorModalOpen.value = false;
  router.push('/signup');
};

const goToHome = () => {
  isSuccessModalOpen.value = false;
  router.push('/');
};
</script>
