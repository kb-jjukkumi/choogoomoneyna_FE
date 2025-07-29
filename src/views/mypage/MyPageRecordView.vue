<template>
  <div class="relative flex justify-center w-full min-h-screen">
    <TopNavigation :show-back="true" :show-logo-text="false" />
    <div class="bg-ivory flex flex-col gap-2 w-full px-6">
      <!-- 타이틀 -->
      <div class="flex font-bold text-xl justify-center h-14 items-center">
        매칭 기록
      </div>
      <!--랭킹 기록 영역-->
      <div class="flex flex-1 items-center justify-center gap-4">
        <!--좌버튼-->
        <div>
          <button
            class="bg-limegreen-100 w-7 h-7 rounded-[10px] disabled:opacity-50"
            @click="prevPage"
            :disabled="!canGoPrev"
          >
            <img :src="back" alt="" />
          </button>
        </div>
        <!--기록 카드-->
        <div class="grid grid-cols-2 grid-rows-2 gap-4">
          <RecordCard
            v-for="record in pagedRecords"
            :key="record.id"
            :start-date="record.startDate"
            :rank="record.ranking"
            :score="record.score"
          />
        </div>

        <!--우버튼-->
        <div>
          <button
            class="bg-limegreen-100 w-7 h-7 rounded-[10px] disabled:opacity-50"
            @click="nextPage"
            :disabled="!canGoNext"
          >
            <img :src="back" alt="" style="transform: scaleX(-1)" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import back from '@/assets/img/icons/system/system_back.png';
import TopNavigation from '@/components/TopNavigation.vue';

import RecordCard from './components/RecordCard.vue';

const RECORDS = [
  { id: 1, ranking: 15, score: 100, startDate: '2025-07-28' },
  { id: 2, ranking: 13, score: 150, startDate: '2025-08-04' },
  { id: 3, ranking: 12, score: 200, startDate: '2025-08-11' },
  { id: 4, ranking: 11, score: 240, startDate: '2025-08-18' },
  { id: 5, ranking: 10, score: 250, startDate: '2025-08-25' },
  { id: 6, ranking: 9, score: 270, startDate: '2025-09-01' },
  { id: 7, ranking: 8, score: 300, startDate: '2025-09-08' },
];

const page = ref(0); //현재 페이지 번호
const pageSize = 4; //한 페이지에 표시할 카드 개수

//총 페이지수
const totalPages = computed(() => Math.ceil(RECORDS.length / pageSize));

// 화면에 보여줄 데이터 추출
const pagedRecords = computed(() => {
  // 전체 개수
  const total = RECORDS.length;

  // 뒤에서부터 시작해서 4개씩 슬라이스
  const start = total - (page.value + 1) * pageSize;
  const end = total - page.value * pageSize;

  // 음수면(가장 오래된 기록 페이지의 데이터가 4개 미만이면) 0부터 (맨 앞 요소부터)
  const sliceStart = start < 0 ? 0 : start;

  // 자른 후 최신순으로 보여야 하니 reverse
  return RECORDS.slice(sliceStart, end).reverse();
});

// 최신 페이지면 우버튼 비활성화
const canGoNext = computed(() => page.value > 0);

// 가장 오래된 페이지면 좌버튼 비활성화
const canGoPrev = computed(() => page.value < totalPages.value - 1);

function prevPage() {
  if (canGoPrev.value) page.value++;
}

function nextPage() {
  if (canGoNext.value) page.value--;
}
</script>
