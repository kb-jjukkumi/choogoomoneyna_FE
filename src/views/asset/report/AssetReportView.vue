<template>
  <!-- 전체 배경 -->
  <div
    class="min-h-screen bg-ivory flex flex-col items-center justify-between px-4"
  >
    <!-- 헤더 -->
    <div class="text-black text-3xl h-20 flex items-center">
      자산 분석 리포트
    </div>

    <!-- 메인 콘텐츠 영역 -->
    <div class="w-full flex flex-col gap-y-6 pb-6">
      <!-- 순자산 박스 -->
      <div class="bg-limegreen-100 rounded-lg w-full flex flex-col gap-y-1 p-6">
        <span class="text-limegreen-900 text-lg mb-1">
          {{ userData.nickname }} 님의 순자산
        </span>
        <span class="text-green text-xl">
          {{ Number(userData.asset).toLocaleString() }}원
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
            <div class="text-gray-600">{{ reportData.advice }}</div>
            <div
              class="text-gray-600 leading-relaxed whitespace-pre-line"
              v-for="(item, index) in reportData.actionItems"
              :key="index"
            >
              - {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 다음 버튼 -->
    <div class="w-full pb-6">
      <button
        class="w-full bg-limegreen-500 text-white text-2xl py-4 rounded-lg"
        @click="handleNext"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/carousel.css';
import { useRouter } from 'vue-router';

import { fetchAccounts } from '@/api/bankApi';
import { createReport, fetchUserData } from '@/api/userApi';
import AnalysisCard from '@/views/asset/report/components/AnalysisCard.vue';

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

// API 응답 데이터 구조
const reportData = ref({});

const userData = ref({
  nickname: '',
  asset: 0,
  summary: '',
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
const characterAnalysisData = ref({
  image: '/src/assets/img/characters/A.png',
  name: '',
  summary: '작은 실천이 모여 내일을 만든다!',
});

// API에서 리포트 데이터 가져오기
const fetchReportData = async () => {
  try {
    const response = await createReport();
    // 리포트 데이터 저장
    reportData.value = response;
    userData.value.summary = reportData.value.summary;

    characterAnalysisData.value.name = reportData.value.recommend;
    // 유저 닉네임 가져오기
    getUserData();
    // 유저 순자산 잔액 가져오기
    getAsset();
  } catch (error) {
    console.error('리포트 데이터 로드 실패:', error);
  }
};

const getUserData = async () => {
  const response = await fetchUserData();
  userData.value.nickname = response.nickname;
};

const getAsset = async () => {
  const accounts = await fetchAccounts();

  // 계좌가 없으면 종료
  if (accounts.length === 0) return;
  // 자산 총액 계산
  const totalAsset = accounts.reduce(
    (acc, curr) => acc + curr.accountBalance,
    0
  );
  userData.value.asset = totalAsset;
};

// 다음 버튼 클릭 핸들러
const handleNext = () => {
  router.push('/character');
};

onMounted(() => {
  fetchReportData();
});
</script>

<style scoped>
/* 필요시 추가 스타일 */
</style>
