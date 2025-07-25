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
      @next="handleSurvey1Complete"
    />

    <!-- 설문조사 2 -->
    <SurveyTwoComponent
      v-else-if="currentStep === 'survey2'"
      :signup-data="allData.signupData"
      @next="handleSurvey2Complete"
      @skip="handleAssetSkip"
      @error="handleSignupError"
    />

    <!-- 자산 선택 -->
    <AssetSelectComponent
      v-else-if="currentStep === 'asset-select'"
      @next="handleBankSelect"
      :selected-bank-id="allData.assetData.selectedBankId"
    />

    <!-- 자산 연동 -->
    <AssetConnectComponent
      v-else-if="currentStep === 'asset-connect'"
      :selected-bank-id="allData.assetData.selectedBankId"
      @next="handleAssetConnectComplete"
      @additional-connect="handleAddtionalConnect"
    />

    <!-- 캐릭터 선택 -->
    <CharacterSelectComponent
      v-else-if="currentStep === 'character-select'"
      :all-data="allData"
      @complete="handleCharacterSelect"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import authApi from '@/api/authApi';

import AssetConnectComponent from './components/asset/AssetConnectComponent.vue';
import AssetSelectComponent from './components/asset/AssetSelectComponent.vue';
import CharacterSelectComponent from './components/character/CharacterSelectComponent.vue';
import SignupFormComponent from './components/signup/SignupFormComponent.vue';
import SurveyOneComponent from './components/survey/SurveyOneComponent.vue';
import SurveyTwoComponent from './components/survey/SurveyTwoComponent.vue';

// 현재 단계 관리
const currentStep = ref('signup');
const isSignupSuccess = ref(false);

// 누적 데이터 관리 - 모든 데이터를 하나의 객체에 저장
const allData = ref({
  // 회원가입 기본 정보
  signupData: {
    profileImage: null,
    email: '',
    password: '',
    nickname: '',
    choogooMi: 'A',
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

  // 자산 관련 데이터
  assetData: {
    selectedBankId: null,
  },
});

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

const handleSurvey2Complete = async data => {
  // 설문조사 2 데이터를 allData에 누적
  allData.value.survey2Data = {
    ...allData.value.survey2Data,
    ...data,
  };
  const loginData = {
    email: allData.value.signupData.email,
    password: allData.value.signupData.password,
  };
  await authApi.login(loginData);

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
  allData.value.assetData.selectedBankId = bankId;
  currentStep.value = 'asset-connect';
};

const handleAddtionalConnect = () => {
  currentStep.value = 'asset-select';
};

const handleAssetConnectComplete = () => {
  currentStep.value = 'character-select';
};

const handleCharacterSelect = data => {
  // 캐릭터 선택 정보를 allData에 저장
  allData.value.signupData.choogooMi = data.choogooMi;
  router.push('/login');
};

const handleSignupError = () => {
  // 오류 시 처음부터 다시 시작
  currentStep.value = 'signup';

  // allData 초기화
  allData.value = {
    signupData: {
      profileImage: null,
      email: '',
      password: '',
      nickname: '',
      choogooMi: 'A',
    },
    survey1Data: {
      age: null,
      income: null,
      save: null,
      habit: null,
    },
    survey2Data: [],
    assetData: {
      selectedBankId: null,
    },
  };
};
</script>
