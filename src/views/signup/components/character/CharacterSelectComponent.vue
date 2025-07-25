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
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import { CHOOGOOMI_CHARACTERS } from '../../constants/choogoomiList';
import CharacterCard from './CharacterCard.vue';
import CharacterDetailModal from './CharacterDetailModal.vue';

// Props 정의
const props = defineProps({
  allData: { type: Object, required: true },
  assetSkipped: { type: Boolean, default: false },
});

// Emit 정의
const emit = defineEmits(['complete']);

const selected = ref(null);
const isModalOpen = ref(false);
const isSigningUp = ref(false);

const profileImage = ref(null);

const select = idx => {
  selected.value = idx;
  const selectedChar = CHOOGOOMI_CHARACTERS.find(
    char => char.choogoomiId === idx
  );

  isModalOpen.value = true;
};

// 캐릭터 선택 확정 및 회원가입 API 호출
const confirmSelection = async () => {
  if (isSigningUp.value) return; // 중복 요청 방지

  isSigningUp.value = true;

  const selectedChar = CHOOGOOMI_CHARACTERS.find(
    char => char.choogoomiId === selected.value
  );

  // 최종 회원가입 데이터 구성 (누적된 모든 데이터 포함)
  const finalSignupData = {
    ...props.allData.signupData,
    profileImage: profileImage.value,
    choogooMi: selectedChar.choogoomiId,
  };

  // 기존 회원가입 API 호출 대신 console.log로 변경
  console.log('캐릭터 선택 완료 - 회원가입 데이터:', finalSignupData);
  console.log('선택된 캐릭터:', selectedChar);

  // 캐릭터 선택 완료 시 부모에게 알림
  isModalOpen.value = false;
  isSigningUp.value = false;

  // 최종 선택된 캐릭터 정보 전달
  const selectedCharacterData = {
    choogooMi: selected.value,
    profileImage: profileImage.value,
  };

  emit('complete', selectedCharacterData);
};

// 선택된 캐릭터 정보
const selectedCharacter = computed(() => {
  return selected.value !== null
    ? CHOOGOOMI_CHARACTERS.find(char => char.choogoomiId === selected.value)
    : null;
});
</script>
