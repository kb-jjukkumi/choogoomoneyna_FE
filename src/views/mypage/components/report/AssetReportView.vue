<template>
  <!-- 전체 배경 -->
  <div
    class="min-h-screen bg-ivory flex flex-col items-center justify-evenly px-4"
  >
    <!-- 메인 콘텐츠 영역 -->
    <div
      class="flex flex-col w-full items-center justify-center overflow-y-auto"
    >
      <!-- 헤더 -->
      <div class="h-20 flex items-center justify-center w-full gap-x-4">
        <!-- 이전 버튼 -->
        <div
          class="flex items-center justify-center bg-limegreen-100 rounded-xl"
        >
          <button
            @click="goToPreviousReport"
            :disabled="currentReportIndex === 0"
            :class="[
              'size-10 flex items-center justify-center rounded-xl',
              currentReportIndex === 0 && 'cursor-not-allowed text-gray-300',
            ]"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <!-- 제목 -->
        <div class="text-black text-2xl text-center">자산 분석 리포트</div>
        <!-- 다음 버튼 -->
        <div
          class="flex items-center justify-center bg-limegreen-100 rounded-xl"
        >
          <button
            @click="goToNextReport"
            :disabled="currentReportIndex === reportList.length - 1"
            :class="[
              'size-10 flex items-center justify-center rounded-xl',
              currentReportIndex === reportList.length - 1 &&
                'cursor-not-allowed text-gray-300',
            ]"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <!-- 리포트 생성날짜 및 인덱스 -->
      <div class="text-gray-500 text-lg mb-4">
        {{ currentReport.regDate }}
      </div>

      <!-- 메인 콘텐츠 박스들 -->
      <div class="w-full flex flex-col gap-y-6">
        <!-- 순자산 박스 -->
        <div
          class="bg-limegreen-100 rounded-lg w-full flex flex-col gap-y-1 p-6"
        >
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
              class="bg-ivory rounded-lg p-4 flex flex-col gap-y-1 h-80 overflow-y-scroll [&::-webkit-scrollbar]:hidden"
            >
              <div class="text-gray-600">{{ currentReport.title }}</div>
              <div class="text-gray-600 leading-relaxed whitespace-pre-line">
                {{ currentReport.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 고정 버튼 -->
    <button
      class="w-full bg-limegreen-500 text-white text-2xl py-4 rounded-lg"
      @click="handleClose"
    >
      확인
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/carousel.css';
import { useRouter } from 'vue-router';

import AnalysisCard from '@/views/mypage/components/report/components/AnalysisCard.vue';

const carouselConfig = {
  // 한 번에 보여줄 슬라이드 개수 (1개씩 보여주기)
  itemsToShow: 1,
  // 마지막 슬라이드에서 첫 번째 슬라이드로 순환 이동 가능
  wrapAround: true,
  // 자동재생 간격 (밀리초) - 2초마다 자동으로 다음 슬라이드
  autoplay: 2000,
  // 슬라이드 전환 애니메이션 속도 (밀리초) - 2초 동안 부드럽게 전환
  transition: 2000,
  // 슬라이드 간 간격 (픽셀) - 슬라이드 사이 20px 여백
  gap: 20,
  // 마우스 드래그로 슬라이드 이동 허용
  mouseDrag: true,
  // 터치(모바일)로 슬라이드 이동 허용
  touchDrag: true,
  // 마우스 호버 시 자동재생 일시정지 (사용자가 내용을 자세히 볼 수 있도록)
  pauseAutoplayOnHover: true,
};

const router = useRouter();

// 사용자 데이터
const userData = ref({
  nickname: '닉네임',
  asset: 5000000,
  summary: '현재 자산은 평균보다 조금 낮아요!',
});

// 리포트 데이터 배열 (API에서 받아올 데이터)
const reportList = ref([
  {
    reportId: 1,
    title: '고정비 절약으로 여유자금을 늘려보세요!',
    content: `월 고정비 분석 결과 절약 가능한 부분들이 발견되었습니다.

  고정비 현황:
  - 통신비: 12만원 (절약 가능: 4만원)
  - 구독 서비스: 8만원 (절약 가능: 3만원)
  - 보험료: 25만원 (적정 수준)
  - 기타: 15만원

  절약 방안:
  1. 통신 요금제 최적화 및 가족결합 할인 활용
  2. 미사용 구독 서비스 정리 (현재 7개 중 3개만 활용)
  3. 절약된 월 7만원을 투자자금으로 활용

  연간 84만원 절약 효과로 투자 원금 확대가 가능합니다.`,
    regDate: '2025.07.01',
  },
  {
    reportId: 2,
    title: '투자 포트폴리오 다양성을 높여보세요!',
    content: `현재 투자 자산이 예금에만 집중되어 있어 인플레이션 대비 실질 수익률이 낮을 수 있습니다.

    분석 결과:
    - 예금/적금: 80%
    - 주식/펀드: 15%
    - 기타: 5%

    권장사항:
    1. 주식/펀드 비중을 30-40%까지 단계적으로 확대
    2. 해외 투자상품 10-15% 편입으로 환위험 분산
    3. 월 정기적립으로 달러코스트 평균 효과 활용

    이를 통해 연평균 2-3% 추가 수익률 개선이 가능할 것으로 예상됩니다.`,
    regDate: '2025.07.15',
  },
  {
    reportId: 3,
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
    regDate: '2025.07.29',
  },
]);

// 현재 리포트 인덱스
const currentReportIndex = ref(reportList.value.length - 1);

// 현재 리포트 계산된 속성
const currentReport = computed(() => {
  return reportList.value[currentReportIndex.value];
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

// API에서 리포트 목록 가져오기
const fetchReportList = async () => {
  try {
    // 실제 API 호출 시 사용할 코드
    // const response = await fetch('/api/user/reports');
    // const data = await response.json();
    // reportList.value = data.reports || [];
  } catch (error) {
    console.error('리포트 목록 로드 실패:', error);
  }
};

// 이전 리포트로 이동
const goToPreviousReport = () => {
  if (currentReportIndex.value > 0) {
    currentReportIndex.value--;
  }
};

// 다음 리포트로 이동
const goToNextReport = () => {
  if (currentReportIndex.value < reportList.value.length - 1) {
    currentReportIndex.value++;
  }
};

// 키보드 네비게이션 핸들러
const handleKeydown = event => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    goToPreviousReport();
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    goToNextReport();
  }
};

const handleClose = () => {
  router.push('/mypage');
};
</script>

<style scoped>
/* 필요시 추가 스타일 */
</style>
