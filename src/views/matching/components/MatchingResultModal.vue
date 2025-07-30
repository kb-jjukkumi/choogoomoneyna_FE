<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/70 z-20">
    <div
      class="flex flex-col gap-3 bg-limegreen-500 rounded-4xl p-6 items-center"
    >
      <!--지난주 매칭 결과-->
      <div>
        <div class="text-limegreen-900">지난주 매칭 결과</div>
        <div class="bg-ivory flex rounded-[10px] p-5">
          <div class="flex gap-5 text-sm text-center">
            <div>
              <div>카카오대학교라이언</div>
              <div>50점</div>
            </div>
            <div>VS</div>
            <div>
              <div>카카오대학교어피치</div>
              <div>20점</div>
            </div>
          </div>
        </div>
      </div>
      <!--미션 목록-->
      <div></div>
      <button
        class="bg-ivory w-36 h-12 rounded-[10px] text-limegreen-900"
        @click="$emit('close')"
      >
        확인
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
</script>
