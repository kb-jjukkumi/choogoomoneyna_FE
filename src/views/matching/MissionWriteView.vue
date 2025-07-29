<template>
  <TopNavigation :showBack="true" :showLogoText="false" />
  <div class="relative flex justify-center w-full">
    <div class="bg-ivory flex flex-col gap-6 w-full mt-10 px-6 justify-between">
      <!-- 타이틀 -->
      <div class="flex flex-col text-center gap-2">
        <div class="tfont-bold text-2xl justify-center">
          {{ MISSION_LIST.missionTitle }}
        </div>
        <div class="text-limegreen-700 text-sm mt-2 whitespace-pre-line">
          {{ MISSION_LIST.missionContent }}
        </div>
        <div class="text-red text-sm">
          {{ '(' + MISSION_LIST.missionRestrict + '자 이상)' }}
        </div>
      </div>
      <div
        class="flex flex-col gap-5 bg-limegreen-100 px-4 rounded-lg text-center h-100"
      >
        <!-- 사용자 입력 -->
        <div class="relative w-full justify-start mt-2">
          <textarea
            v-model="inputText"
            placeholder="내용을 입력하세요"
            class="w-full h-92 p-4 resize-none text-left text-limegreen-800 outline-none border-none focus:outline-none focus:ring-0 placeholder:text-limegreen-500"
            maxlength="500"
          ></textarea>
          <div class="absolute bottom-0 right-3 text-sm">
            <p
              :class="
                inputText.length < MISSION_LIST.missionRestrict
                  ? 'text-red'
                  : 'text-green'
              "
            >
              {{ inputText.length + '/500' }}
            </p>
          </div>
        </div>
      </div>

      <!-- 제출 버튼 -->
      <button
        @click="handleNext"
        :disabled="inputText.length < MISSION_LIST.missionRestrict"
        :class="[
          'w-full text-lg py-4 rounded-lg',
          inputText.length < MISSION_LIST.missionRestrict
            ? 'bg-ivory text-limegreen-500 border border-limegreen-500 cursor-not-allowed'
            : 'bg-limegreen-500 text-white',
        ]"
      >
        제출
      </button>
    </div>
  </div>
  <BottomNavigation />

  <SuccessModal
    v-if="showSuccessModal"
    title="미션 성공"
    :message="MISSION_LIST.missionTitle"
    @close="handleSuccessClose"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';

import SuccessModal from './components/SuccessModal.vue';

const inputText = ref('');
const showSuccessModal = ref(false);

const router = useRouter();

const MISSION_LIST = {
  missionId: 1,
  missionTitle: '지출 반성문 쓰기',
  missionContent:
    '돌아보니... 이건 굳이 안 썼어도 됐다 🙈 \n오늘 안 써도 됐던 소비가 있다면, 여기 적으며 반성해봐요!',
  missionCount: 1,
  missionRestrict: 100,
  missionScore: 10,
};

function handleNext() {
  if (inputText.value.length >= MISSION_LIST.missionRestrict) {
    showSuccessModal.value = true;
  }
}

function handleSuccessClose() {
  showSuccessModal.value = false;
  router.push('/matching');
}
</script>
