<template>
  <div class="relative flex justify-center w-full">
    <TopNavigation :showBack="true" :showLogoText="false" />
    <div class="bg-ivory flex flex-col gap-6 w-full mt-10 px-6 justify-between">
      <!-- 타이틀 -->
      <div class="flex flex-col text-center gap-2">
        <div class="tfont-bold text-2xl justify-center">
          {{ MISSION_INFO.missionTitle }}
        </div>
        <div class="text-limegreen-700 text-sm mt-2 whitespace-pre-line">
          {{ MISSION_INFO.missionContent }}
        </div>
        <div class="text-red text-sm">(100자 이상)</div>
      </div>
      <div
        class="flex flex-col gap-5 bg-limegreen-100 px-4 rounded-lg text-center h-100"
      >
        <!-- 사용자 입력 -->
        <div class="relative w-full justify-start text-[13px] mt-2">
          <textarea
            v-model="inputText"
            placeholder="내용을 입력하세요"
            class="w-full h-92 px-4 pt-4 resize-none text-left text-limegreen-800 outline-none border-none focus:outline-none focus:ring-0 placeholder:text-limegreen-500"
            maxlength="500"
          ></textarea>
          <div class="absolute bottom-0 right-3 text-sm">
            <p
              :class="
                inputText.length < 100 || inputText.length == 500
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
        :disabled="inputText.length < 100"
        :class="[
          'w-full text-lg py-4 rounded-lg',
          inputText.length < 100
            ? 'bg-ivory text-limegreen-500 border border-limegreen-500 cursor-not-allowed'
            : 'bg-limegreen-500 text-white',
        ]"
      >
        제출
      </button>
    </div>
    <BottomNavigation />

    <SuccessModal
      v-if="showSuccessModal"
      title="미션 성공"
      :message="MISSION_INFO.missionTitle"
      @close="handleSuccessClose"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { validateWriteMission } from '@/api/matchingApi';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';

import SuccessModal from './components/SuccessModal.vue';

const route = useRoute();

// 전달받은 미션 정보
const MISSION_INFO = {
  missionId: route.query.id,
  missionTitle: route.query.title,
  missionContent: route.query.content,
  missionScore: route.query.score,
};

const inputText = ref('');
const showSuccessModal = ref(false); // 미션 성공 모달

const router = useRouter();

// 미션 완료 여부 조건: 100자 이상 작성
const isMissionCompleted = computed(() => {
  return inputText.value.length >= 100;
});

function handleNext() {
  if (isMissionCompleted.value) {
    showSuccessModal.value = true;
  }
}

async function handleSuccessClose() {
  try {
    await validateWriteMission(MISSION_INFO.missionId);
    showSuccessModal.value = false;
    router.push('/matching');
  } catch (error) {
    alert('미션 인증에 실패했습니다.');
    console.error(error);
  }
}
</script>
