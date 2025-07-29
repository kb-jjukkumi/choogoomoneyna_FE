<template>
  <div
    class="fixed inset-0 bg-ivory flex flex-col items-center justify-center z-50"
  >
    <!-- 메인 콘텐츠 영역 -->
    <div class="flex flex-col items-center gap-8">
      <!-- 캐릭터 애니메이션 영역 -->
      <div class="relative w-80 h-40 flex items-center justify-center">
        <!-- 캐릭터들 -->
        <div
          v-for="(character, index) in characters"
          :key="character.name"
          class="absolute transition-all duration-500 ease-in-out"
          :class="[
            getCharacterPosition(index),
            getCharacterScale(index),
            {
              'opacity-100': character.visible,
              'opacity-30': !character.visible,
            },
          ]"
        >
          <img
            :src="character.src"
            :alt="character.name"
            class="w-16 h-16 object-contain drop-shadow-md"
          />
        </div>
      </div>

      <!-- 로딩 텍스트 -->
      <div class="text-center">
        <h2 class="text-2xl font-jua text-limegreen-800 mb-2">
          추구미들이 준비중이에요!
        </h2>
        <p class="text-sm text-limegreen-700 animate-pulse">
          {{ loadingText }}
        </p>
      </div>

      <!-- 프로그레스 바 -->
      <div class="w-64 bg-limegreen-100 rounded-full h-2 overflow-hidden">
        <div
          class="bg-green h-full rounded-full transition-all duration-300 ease-out"
          :style="{ width: progress + '%' }"
        ></div>
      </div>

      <!-- 점프하는 도트들 -->
      <div class="flex gap-2">
        <div
          v-for="i in 3"
          :key="i"
          class="w-3 h-3 bg-limegreen-500 rounded-full animate-bounce"
          :style="{ animationDelay: (i - 1) * 0.2 + 's' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

// 캐릭터 이미지 import
import characterA from '@/assets/img/characters/A.png';
import characterB from '@/assets/img/characters/B.png';
import characterC from '@/assets/img/characters/C.png';
import characterD from '@/assets/img/characters/D.png';
import characterE from '@/assets/img/characters/E.png';

const emit = defineEmits(['loading-complete']);

// 캐릭터 데이터
const characters = ref([
  { name: 'A', src: characterA, visible: true },
  { name: 'B', src: characterB, visible: false },
  { name: 'C', src: characterC, visible: false },
  { name: 'D', src: characterD, visible: false },
  { name: 'E', src: characterE, visible: false },
]);

// 로딩 상태
const progress = ref(0);
const currentCharacterIndex = ref(0);
const loadingTexts = [
  '추구미들을 불러오고 있어요...',
  '데이터를 준비중이에요...',
  '거의 다 됐어요!',
  '완료!',
];
const loadingText = ref(loadingTexts[0]);

let animationInterval;
let progressInterval;
let textInterval;

// 캐릭터 위치 계산
const getCharacterPosition = index => {
  const positions = [
    'left-0 top-0', // A - 왼쪽 위
    'right-0 top-0', // B - 오른쪽 위
    'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', // C - 중앙
    'left-0 bottom-0', // D - 왼쪽 아래
    'right-0 bottom-0', // E - 오른쪽 아래
  ];
  return positions[index];
};

// 캐릭터 크기 계산
const getCharacterScale = index => {
  return characters.value[index].visible ? 'scale-110' : 'scale-100';
};

// 캐릭터 애니메이션
const animateCharacters = () => {
  // 모든 캐릭터를 일시적으로 숨김
  characters.value.forEach(char => (char.visible = false));

  // 현재 캐릭터만 표시
  characters.value[currentCharacterIndex.value].visible = true;

  // 다음 캐릭터로 이동
  currentCharacterIndex.value =
    (currentCharacterIndex.value + 1) % characters.value.length;
};

// 프로그레스 바 업데이트
const updateProgress = () => {
  if (progress.value < 100) {
    progress.value += 2;
  }
};

// 로딩 텍스트 업데이트
const updateLoadingText = () => {
  const textIndex = Math.min(
    Math.floor(progress.value / 25),
    loadingTexts.length - 1
  );
  loadingText.value = loadingTexts[textIndex];
};

onMounted(() => {
  // 캐릭터 애니메이션 (500ms마다)
  animationInterval = setInterval(animateCharacters, 500);

  // 프로그레스 바 업데이트 (100ms마다)
  progressInterval = setInterval(() => {
    updateProgress();
    updateLoadingText();

    // 로딩 완료 시
    if (progress.value >= 100) {
      setTimeout(() => {
        emit('loading-complete');
      }, 500);
    }
  }, 100);
});

onUnmounted(() => {
  if (animationInterval) clearInterval(animationInterval);
  if (progressInterval) clearInterval(progressInterval);
  if (textInterval) clearInterval(textInterval);
});
</script>

<style scoped>
/* 추가 애니메이션 효과 */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 2s ease-in-out infinite;
}
</style>
