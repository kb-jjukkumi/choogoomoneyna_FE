<template>
  <div class="flex justify-center w-full">
    <div class="bg-ivory flex flex-col gap-6 w-full px-6">
      <!-- 타이틀 -->
      <div class="flex flex-col text-center gap-2">
        <div class="tfont-bold text-2xl justify-center">사전 조사</div>
        <div class="text-limegreen-700 text-sm">
          추구 유형 추천을 위한 질문입니다.
        </div>
      </div>

      <!-- Progress Bar -->
      <div></div>

      <!-- 설문조사 항목 -->

      <!-- 다음 버튼 -->
      <button
        @click="handleNext"
        class="w-full bg-limegreen-500 text-white text-lg py-4 rounded-lg"
      >
        다음
      </button>

      <!--선택하지 않은 항목이 있을 때 모달 -->
      <LoginModal
        v-if="showModal"
        title="알림"
        message="모든 항목에 응답해주세요."
        buttonText="확인"
        @close="showModal = false"
      />
    </div>
  </div>
</template>

<script setup></script>
