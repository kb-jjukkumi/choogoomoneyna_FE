<template>
  <div class="min-h-screen bg-ivory">
    <!-- 회원가입 기본 정보 입력 -->
    <SignupFormComponent
      v-if="currentStep === 'signup'"
      :all-data="allData"
      @next="handleSignupFormComplete"
    />

    <!-- 설문조사 1 -->
    <SurveyOneComponent
      v-else-if="currentStep === 'survey1'"
      :all-data="allData"
      @next="handleSurvey1Complete"
    />

    <!-- 설문조사 2 -->
    <SurveyTwoComponent
      v-else-if="currentStep === 'survey2'"
      :all-data="allData"
      @next="handleSurvey2Complete"
      @skip="handleAssetSkip"
    />

    <!-- 자산 선택 -->
    <AssetSelectComponent
      v-else-if="currentStep === 'asset-select'"
      :all-data="allData"
      @next="handleBankSelect"
    />

    <!-- 자산 연동 -->
    <AssetConnectComponent
      v-else-if="currentStep === 'asset-connect'"
      :all-data="allData"
      :selected-bank-id="selectedBankId"
      @next="handleAssetConnectComplete"
    />

    <!-- 캐릭터 선택 -->
    <CharacterSelectComponent
      v-else-if="currentStep === 'character-select'"
      :all-data="allData"
      @complete="handleCharacterSelect"
      @error="handleSignupError"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

import AssetConnectComponent from './components/AssetConnectComponent.vue';
import AssetSelectComponent from './components/AssetSelectComponent.vue';
import CharacterSelectComponent from './components/CharacterSelectComponent.vue';
import SignupFormComponent from './components/SignupFormComponent.vue';
import SurveyOneComponent from './components/SurveyOneComponent.vue';
import SurveyTwoComponent from './components/SurveyTwoComponent.vue';

// 현재 단계 관리
const currentStep = ref('survey1');

// 누적 데이터 관리 - 모든 데이터를 하나의 객체에 저장
const allData = ref({
  // 회원가입 기본 정보
  signupData: {
    profileImage: null,
    email: '',
    password: '',
    nickname: '',
    choogooMi: '',
  },

  // 설문조사 1 답변
  survey1Data: {
    age: null,
    income: null,
    save: null,
    habit: null,
  },

  // 설문조사 2 답변
  survey2Data: [],

  // 선택된 캐릭터 정보
  characterData: {
    choogooMi: '',
  },
});

// 자산 관련 데이터 (개별 관리용)
const selectedBankId = ref(null);
const selectedChoogooMi = ref('');

// 단계별 완료 핸들러
const handleSignupFormComplete = data => {
  // 회원가입 데이터를 allData에 누적
  allData.value.signupData = { ...allData.value.signupData, ...data };
  currentStep.value = 'survey1';
};

const handleSurvey1Complete = data => {
  // 설문조사 1 데이터를 allData에 누적
  allData.value.survey1Data = {
    ...allData.value.survey1Data,
    ...data,
  };
  currentStep.value = 'survey2';
};

const handleSurvey2Complete = data => {
  // 설문조사 2 데이터를 allData에 누적
  allData.value.survey2Data = {
    ...allData.value.survey2Data,
    ...data,
  };
  currentStep.value = 'asset-select';
};

const handleAssetSkip = data => {
  allData.value.survey2Data = {
    ...allData.value.survey2Data,
    ...data,
  };
  currentStep.value = 'character-select';
};

const handleBankSelect = bankId => {
  selectedBankId.value = bankId;
  currentStep.value = 'asset-connect';
};

const handleAssetConnectComplete = () => {
  currentStep.value = 'character-select';
};

const handleCharacterSelect = data => {
  // 캐릭터 선택 정보를 allData에 저장
  allData.value.characterData = { ...data };
  selectedChoogooMi.value = data;
};

const handleSignupError = () => {
  console.log('❌ 회원가입 중 오류가 발생했습니다. 처음부터 다시 시작합니다.');
  // 오류 시 처음부터 다시 시작
  currentStep.value = 'signup';

  // allData 초기화
  allData.value = {
    signupData: {
      profileImage: null,
      email: '',
      password: '',
      nickname: '',
      choogooMi: '',
    },
    survey1Data: {
      age: null,
      income: null,
      save: null,
      habit: null,
    },
    survey2Data: [],
    characterData: {
      choogooMi: '',
    },
  };

  // 개별 데이터도 초기화
  selectedBankId.value = null;
  selectedChoogooMi.value = '';
};

// allData 변경 감시
watch(
  allData,
  newData => {
    console.log('📊 allData 변경:', newData);
  },
  { deep: true }
);
</script>
