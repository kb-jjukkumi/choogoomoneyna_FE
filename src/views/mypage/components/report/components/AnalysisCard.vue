<template>
  <div class="bg-ivory rounded-lg p-6 w-full h-full">
    <div class="rounded-lg flex flex-col gap-y-1">
      <!-- 제목 -->
      <span class="text-gray-600 text-[14px]">
        {{ title }}
      </span>

      <!-- 차트 모드 -->
      <div v-if="mode === 'chart'" class="flex items-center justify-between">
        <!-- 원형 차트 -->
        <div class="relative w-22 h-22">
          <svg class="w-22 h-22 transform -rotate-90" viewBox="0 0 120 120">
            <!-- 배경 원 -->
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e5e7eb"
              stroke-width="10"
            />
            <!-- 진행률 원 -->
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#228b22"
              stroke-width="10"
              stroke-dasharray="314.16"
              :stroke-dashoffset="
                314.16 - (314.16 * chartData.percentage) / 100
              "
              stroke-linecap="round"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-sm text-green">{{ chartData.percentage }}%</span>
          </div>
        </div>

        <!-- 카테고리별 데이터 -->
        <div class="flex flex-col space-y-2">
          <div
            v-for="category in chartData.categories"
            :key="category.name"
            class="flex items-center justify-between gap-2"
          >
            <!-- 카테고리 이름 -->
            <span class="text-gray-300 text-sm">{{ category.name }}</span>
            <div class="flex items-center gap-2">
              <!-- 진행률 바 -->
              <div class="w-20 h-2 rounded-full overflow-hidden">
                <div
                  class="h-full bg-green rounded-full"
                  :style="{ width: `${category.percentage}%` }"
                ></div>
              </div>
              <!-- 퍼센트 표시 -->
              <span class="text-[10px] text-gray-300">
                {{ category.percentage }}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 캐릭터 모드 -->
      <div
        v-else-if="mode === 'character'"
        class="flex items-center justify-between"
      >
        <!-- 캐릭터 이미지 -->
        <div class="flex items-center justify-center flex-col">
          <img
            :src="characterData.image"
            :alt="characterData.name"
            class="size-22 object-cover"
          />
          <div class="text-limegreen-700">
            {{ characterData.name }}
          </div>
        </div>

        <!-- 캐릭터 정보 -->
        <div class="flex-1">
          <div class="text-gray-500 text-sm leading-relaxed">
            {{ characterData.summary }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Props 정의
const props = defineProps({
  // 모드: 'chart', 'character'
  mode: {
    type: String,
    default: 'chart',
    validator: value => ['chart', 'character'].includes(value),
  },
  // 카드 제목
  title: {
    type: String,
    default: '',
  },
  // 차트 모드 데이터
  chartData: {
    type: Object,
    default: () => ({
      percentage: 0,
      categories: [],
    }),
  },
  // 캐릭터 모드 데이터
  characterData: {
    type: Object,
    default: () => ({
      image: '',
      name: '',
      summary: '',
    }),
  },
});
</script>

<style scoped>
/* 필요시 추가 스타일 */
</style>
