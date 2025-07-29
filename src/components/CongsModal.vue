<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
  >
    <div class="w-[85%] bg-white rounded-2xl p-6 text-center relative">
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-500 text-xl"
      >
        ✕
      </button>

      <!-- 타이틀 -->
      <h2
        class="text-green-700 font-bold text-lg flex justify-center items-center gap-1"
      >
        <span>{{ title }}</span>
        <img src="@/assets/party-icon.png" alt="party" class="w-5 h-5" />
      </h2>

      <!-- 설명 -->
      <p class="text-sm text-gray-700 mt-2 whitespace-pre-line">
        {{ description }}
      </p>

      <!-- 경고 -->
      <p
        class="text-xs text-gray-400 mt-2 flex justify-center items-center gap-1"
      >
        ⚠️ {{ caution }}
      </p>

      <!-- 입력 -->
      <input
        v-model="phone"
        type="text"
        class="mt-4 w-full rounded-lg bg-limegreen-100 text-sm px-4 py-2 placeholder:text-gray-400"
        :placeholder="inputPlaceholder"
      />

      <!-- 버튼 -->
      <button
        class="mt-4 w-full py-2 rounded-lg text-white bg-limegreen-500 font-bold text-sm"
        @click="$emit('submit', phone)"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: String,
  description: String,
  caution: String,
  inputPlaceholder: {
    type: String,
    default: '전화번호를 입력해주세요.',
  },
  buttonText: {
    type: String,
    default: '확인',
  },
});

const emit = defineEmits(['close', 'submit']);

const phone = ref('');
</script>
