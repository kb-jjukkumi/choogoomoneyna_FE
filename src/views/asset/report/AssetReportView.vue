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
      <!-- 지출 분석 차트 박스 -->
      <div class="bg-ivory rounded-lg p-4">
        <div class="rounded-lg flex flex-col gap-y-1">
          <span class="text-gray-600 text-[14px]">
            전체 수입 대비 지출이 많아요!
          </span>

          <div class="flex items-center justify-between">
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
                  :stroke-dashoffset="314.16 - (314.16 * expenseRatio) / 100"
                  stroke-linecap="round"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-sm text-green">{{ expenseRatio }}%</span>
              </div>
            </div>
            <!-- 카테고리별 지출 -->
            <div class="flex flex-col space-y-2">
              <div
                v-for="category in expenseCategories"
                :key="category.name"
                class="flex items-center justify-between gap-2"
              >
                <!-- 카테고리 이름 -->
                <span class="text-gray-300 text-sm">{{ category.name }}</span>
                <div class="flex items-center gap-2">
                  <!-- 지출 퍼센트 바 -->
                  <div class="w-20 h-2 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-green rounded-full"
                      :style="{ width: `${category.percentage}%` }"
                    ></div>
                  </div>
                  <!-- 퍼센트 표시 -->
                  <span class="text-[10px] text-gray-300"
                    >{{ category.percentage }}%</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import TopNavigation from '@/components/TopNavigation.vue';

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

// 날짜 포맷팅 함수
const formatDate = dateString => {
  if (!dateString) return '';
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return `${year}년 ${month}월 ${day}일`;
};

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
