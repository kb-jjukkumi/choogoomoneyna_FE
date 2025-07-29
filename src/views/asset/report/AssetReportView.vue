<template>
  <!-- 전체 배경 -->
  <div
    class="min-h-screen bg-ivory flex flex-col relative items-center justify-center px-4 gap-y-6"
  >
    <!-- 상단 네비게이션 -->
    <TopNavigation
      :show-back="false"
      :show-logo-text="true"
      :logo-text="'분석 리포트'"
    />
    <!-- 순자산 박스 -->
    <div class="bg-limegreen-100 rounded-lg w-full flex flex-col gap-y-1 p-6">
      <span class="text-limegreen-900 text-lg mb-1">
        '{{ userData.nickname }}' 님의 순자산
      </span>
      <span class="text-green text-xl">
        {{ userData.asset.toLocaleString() }}원
      </span>
      <span class="text-gray-300 text-sm">
        {{ userData.summary }}
      </span>
    </div>
    <!-- 메인 컨테이너 -->
    <div
      class="w-full flex h-110 flex-col bg-limegreen-500 rounded-lg p-6 gap-y-4"
    >
      <Carousel v-bind="carouselConfig">
        <Slide>
          <!-- 지출 분석 차트 박스 -->
          <AnalysisCard
            mode="chart"
            title="전체 수입 대비 지출이 많아요!"
            :chart-data="chartAnalysisData"
          />
        </Slide>
        <!-- 캐릭터 분석 예제 -->
        <Slide>
          <AnalysisCard
            mode="character"
            :character-data="characterAnalysisData"
          />
        </Slide>
      </Carousel>

      <!-- 분석 내용 박스 -->
      <div class="bg-limegreen-200 rounded-lg overflow-hidden">
        <div
          class="bg-ivory rounded-lg p-4 flex flex-col gap-y-1 h-80 overflow-y-scroll"
        >
          <div class="text-gray-600">{{ reportData.title }}</div>
          <div class="text-gray-600 leading-relaxed whitespace-pre-line">
            {{ reportData.content }}
          </div>
        </div>
      </div>
    </div>
    <!-- 다음 버튼 -->

    <button
      class="fixed bottom-10 w-[335px] bg-limegreen-500 text-white text-2xl! py-4 rounded-lg"
      @click="handleNext"
    >
      다음
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/carousel.css';
import { useRouter } from 'vue-router';

import TopNavigation from '@/components/TopNavigation.vue';
import AnalysisCard from '@/views/asset/report/components/AnalysisCard.vue';

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: 3000,
  slideEffect: 'fade',
};

const router = useRouter();
const userData = ref({
  nickname: '닉네임',
  asset: 5000000,
  summary: '현재 자산은 평균보다 조금 낮아요!',
});
// API 응답 데이터 구조
const reportData = ref({
  reportId: 1,
  userId: 101,
  title: '지출이 너무 많고 카페,식사 등 식비에 지출이 큰 유형이에요.',
  content: `한달 수입의 80퍼센트 이상을 지출로 쓰고 있습니다.
그 중 카페에서 매주 10만원 이상을 소비하여 이 부분을 줄인다면
목표하는 투자형에 필요한 시드머니를 채울 수 있을 것으로 예상됩니다.

현재 지출 패턴을 분석한 결과:
- 월 카페 지출: 약 40만원
- 외식비: 약 25만원
- 기타 식비: 약 15만원

이 중 카페 지출만 절반으로 줄여도 월 20만원, 연간 240만원을 절약할 수 있습니다.
절약한 금액을 투자 포트폴리오에 투입하면 장기적으로 더 큰 수익을 기대할 수 있습니다.`,
  regDate: '20250716',
});

// 차트 데이터
const expenseRatio = ref(80);
const expenseCategories = ref([
  { name: '식비', percentage: 35 },
  { name: '카페', percentage: 25 },
  { name: '쇼핑', percentage: 20 },
  { name: '기타', percentage: 20 },
]);

// AnalysisCard에서 사용할 차트 데이터
const chartAnalysisData = computed(() => ({
  percentage: expenseRatio.value,
  categories: expenseCategories.value,
}));

// AnalysisCard에서 사용할 캐릭터 데이터
const characterAnalysisData = computed(() => ({
  image: '/src/assets/img/characters/A.png',
  name: '지출제로형',
  summary: '작은 실천이 모여 내일을 만든다!',
}));

// API에서 리포트 데이터 가져오기
const fetchReportData = async () => {
  try {
    // 실제 API 호출 시 사용할 코드
    // const response = await fetch('/api/report/{reportId}');
    // const data = await response.json();
    // reportData.value = data;

    console.log('리포트 데이터 로드됨:', reportData.value);
  } catch (error) {
    console.error('리포트 데이터 로드 실패:', error);
  }
};

// 다음 버튼 클릭 핸들러
const handleNext = () => {
  console.log('분석 리포트 완료');
  // router.push('/next-page'); // 필요시 라우팅
};

onMounted(() => {
  fetchReportData();
});
</script>

<style scoped>
/* 필요시 추가 스타일 */
</style>
