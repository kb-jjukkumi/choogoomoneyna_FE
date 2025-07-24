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
      :is-signing-up="isSigningUp"
      @close="isModalOpen = false"
      @select="confirmSelection"
    />
    <AlertModal
      v-if="isErrorModalOpen"
      title="오류"
      message="회원가입 중 문제가 발생했습니다. 다시 시도해주세요."
      @close="handleError"
    />
    <AlertModal
      v-if="isSuccessModalOpen"
      title="회원가입"
      message="회원가입이 완료되었습니다."
      @close="handleSuccess"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import authApi from '@/api/authApi';
import AlertModal from '@/components/AlertModal.vue';

import CharacterCard from '../character/components/CharacterCard.vue';
import CharacterDetailModal from '../character/components/CharacterDetailModal.vue';
import { CHOOGOOMI_CHARACTERS } from '../constants/choogoomiList';

// Props 정의
const props = defineProps({
  allData: { type: Object, required: true },
  assetSkipped: { type: Boolean, default: false },
});

// Emit 정의
const emit = defineEmits(['complete', 'error']);

// 전달받은 누적 데이터 확인
console.log('🎭 CharacterSelect에서 받은 누적 데이터:', props.allData);

const selected = ref(null);
const isModalOpen = ref(false);
const isErrorModalOpen = ref(false);
const isSuccessModalOpen = ref(false);
const isSigningUp = ref(false);

const profileImage = ref(null);

const select = idx => {
  selected.value = idx;
  const selectedChar = CHOOGOOMI_CHARACTERS.find(
    char => char.choogoomiId === idx
  );

  console.log('선택한 캐릭터:', selectedChar);
  isModalOpen.value = true;
};

// 캐릭터 선택 확정 및 회원가입 API 호출
const confirmSelection = async () => {
  if (isSigningUp.value) return; // 중복 요청 방지

  isSigningUp.value = true;
  try {
    const selectedChar = CHOOGOOMI_CHARACTERS.find(
      char => char.choogoomiId === selected.value
    );

    // 최종 회원가입 데이터 구성 (누적된 모든 데이터 포함)
    const finalSignupData = {
      ...props.allData.signupData,
      choogooMi: selectedChar.choogoomiId,
      profileImage: profileImageFile,
      survey1Data: props.allData.survey1Data,
      survey2Data: props.allData.survey2Data,
      assetData: props.allData.assetData,
      assetSkipped: props.assetSkipped,
    };
    console.log('✅ 최종 회원가입 데이터 (누적):', finalSignupData);
    // 회원가입 API 호출
    await authApi.signup(finalSignupData);

    // 회원가입 성공 시 성공 모달 표시
    isSuccessModalOpen.value = true;
  } catch (error) {
    console.error('회원가입 실패:', error);
    // 에러 처리 - 에러 모달 표시
    isErrorModalOpen.value = true;
  } finally {
    isModalOpen.value = false;
    isSigningUp.value = false;
  }
};

// 선택된 캐릭터 정보
const selectedCharacter = computed(() => {
  return selected.value !== null
    ? CHOOGOOMI_CHARACTERS.find(char => char.choogoomiId === selected.value)
    : null;
});

const handleError = () => {
  isErrorModalOpen.value = false;
  emit('error');
};

const handleSuccess = () => {
  isSuccessModalOpen.value = false;

  // 최종 선택된 캐릭터 정보 전달
  const selectedCharacterData = {
    choogooMi: selected.value,
    profileImage: profileImage.value,
  };

  console.log('✅ 캐릭터 선택 완료 - 회원가입 성공!');
  console.log('선택된 캐릭터 데이터:', selectedCharacterData);

  emit('complete', selectedCharacterData);
};
</script>
