<template>
  <div class="min-h-screen bg-ivory">
    <!-- 회원가입 기본 정보 입력 -->
    <SignupFormComponent
      v-if="currentStep === 'signup'"
      @next="handleSignupFormComplete"
    />

    <!-- 설문조사 1 -->
    <SurveyOneComponent
      v-else-if="currentStep === 'survey1'"
      :signup-data="signupData"
      @next="handleSurvey1Complete"
    />

    <!-- 설문조사 2 -->
    <SurveyTwoComponent
      v-else-if="currentStep === 'survey2'"
      :signup-data="signupData"
      :survey1-data="survey1Data"
      @next="handleSurvey2Complete"
      @skip="handleAssetSkip"
    />

    <!-- 자산 선택 -->
    <AssetSelectComponent
      v-else-if="currentStep === 'asset-select'"
      :signup-data="signupData"
      :survey1-data="survey1Data"
      :survey2-data="survey2Data"
      @next="handleBankSelect"
    />

    <!-- 자산 연동 -->
    <AssetConnectComponent
      v-else-if="currentStep === 'asset-connect'"
      :signup-data="signupData"
      :survey1-data="survey1Data"
      :survey2-data="survey2Data"
      :selected-bank-id="selectedBankId"
      @next="handleAssetConnectComplete"
    />

    <!-- 캐릭터 선택 -->
    <CharacterSelectComponent
      v-else-if="currentStep === 'character-select'"
      :signup-data="signupData"
      :survey1-data="survey1Data"
      :survey2-data="survey2Data"
      :asset-skipped="assetSkipped"
      @complete="handleCharacterSelect"
      @error="handleSignupError"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import AssetConnectComponent from './components/AssetConnectComponent.vue';
import AssetSelectComponent from './components/AssetSelectComponent.vue';
import CharacterSelectComponent from './components/CharacterSelectComponent.vue';
import SignupFormComponent from './components/SignupFormComponent.vue';
import SurveyOneComponent from './components/SurveyOneComponent.vue';
import SurveyTwoComponent from './components/SurveyTwoComponent.vue';

const router = useRouter();

// 현재 단계 관리
const currentStep = ref('survey1');

// 회원가입 데이터
const signupData = ref({
  profileImage: null,
  email: '',
  password: '',
  nickname: '',
  choogooMi: '',
});

// 설문조사 데이터
const survey1Data = ref({
  age: null,
  income: null,
  save: null,
  habit: null,
});

const survey2Data = ref([]);

// 자산 관련 데이터
const selectedBankId = ref(null);
const assetSkipped = ref(false);

const selectedChoogooMi = ref('');

// 단계별 완료 핸들러
const handleSignupFormComplete = data => {
  signupData.value = { ...signupData.value, ...data };
  currentStep.value = 'survey1';
};

const handleSurvey1Complete = data => {
  survey1Data.value = { ...data };
  currentStep.value = 'survey2';
};

const handleSurvey2Complete = data => {
  survey2Data.value = [...data];
  currentStep.value = 'asset-select';
};

const handleAssetSkip = () => {
  assetSkipped.value = true;
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
  selectedChoogooMi.value = data;
  console.log(signupData.value, survey1Data.value, survey2Data.value);
};

const handleSignupError = () => {
  console.log('회원가입 중 오류가 발생했습니다. 처음부터 다시 시작합니다.');
  // 오류 시 처음부터 다시 시작
  currentStep.value = 'signup';
  // 데이터 초기화
  signupData.value = {
    profileImage: null,
    email: '',
    password: '',
    nickname: '',
    choogooMi: '',
  };
  survey1Data.value = {
    age: null,
    income: null,
    save: null,
    habit: null,
  };
  survey2Data.value = [];
  selectedBankId.value = null;
  assetSkipped.value = false;
};
</script>
