<template>
  <div class="bg-ivory flex flex-col items-center">
    <p
      class="w-full h-20 flex items-center justify-center text-2xl text-limegreen-900"
    >
      추구미 선택
    </p>
    <div class="min-w-xs mt-10">
      <!-- 첫 번째 행: 2개 -->
      <div class="grid grid-cols-2 gap-x-8 gap-y-8 mb-8">
        <CharacterCard
          v-for="character in CHOOGOOMI_CHARACTERS.slice(0, 2)"
          :key="character.choogoomiId"
          :img="character.img"
          :label="character.label"
          :selected="selected === character.choogoomiId"
          @click="select(character.choogoomiId)"
        />
      </div>

      <!-- 두 번째 행: 1개 (가운데 정렬) -->
      <div class="flex justify-center mb-8">
        <CharacterCard
          :img="CHOOGOOMI_CHARACTERS[2].img"
          :label="CHOOGOOMI_CHARACTERS[2].label"
          :selected="selected === CHOOGOOMI_CHARACTERS[2].choogoomiId"
          @click="select(CHOOGOOMI_CHARACTERS[2].choogoomiId)"
        />
      </div>

      <!-- 세 번째 행: 2개 -->
      <div class="grid grid-cols-2 gap-x-8 gap-y-8">
        <CharacterCard
          v-for="character in CHOOGOOMI_CHARACTERS.slice(3, 5)"
          :key="character.choogoomiId"
          :img="character.img"
          :label="character.label"
          :selected="selected === character.choogoomiId"
          @click="select(character.choogoomiId)"
        />
      </div>
    </div>
    <CharacterDetailModal
      v-if="isModalOpen"
      :selected-character="selectedCharacter"
      @close="isModalOpen = false"
      @select="confirmSelection"
    />
    <AlertModal
      v-if="isErrorModalOpen"
      title="오류"
      message="회원가입 중 문제가 발생했습니다. 다시 시도해주세요."
      @close="goToSignup"
    />
    <AlertModal
      v-if="isSuccessModalOpen"
      title="회원가입"
      message="회원가입이 완료되었습니다."
      @close="goToHome"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import authApi from '@/api/authApi';
// 캐릭터 이미지들 import
import characterA from '@/assets/img/characters/A.png';
import characterB from '@/assets/img/characters/B.png';
import characterC from '@/assets/img/characters/C.png';
import characterD from '@/assets/img/characters/D.png';
import characterE from '@/assets/img/characters/E.png';
import AlertModal from '@/components/AlertModal.vue';

import CharacterCard from './components/CharacterCard.vue';
import CharacterDetailModal from './components/CharacterDetailModal.vue';

const router = useRouter();
const selected = ref(null);
const isModalOpen = ref(false);
const isErrorModalOpen = ref(false);
const isSuccessModalOpen = ref(false);

// SignupView에서 전달받은 회원가입 데이터
const signupData = ref(null);
const profileImage = ref(null);

onMounted(() => {
  // 전달받은 state 데이터 확인
  if (history.state && history.state.signupData) {
    signupData.value = history.state.signupData;
    console.log('전달받은 회원가입 데이터:', signupData.value);
  } else {
    isErrorModalOpen.value = true;
    // 데이터가 없으면 회원가입 페이지로 리다이렉트
    router.push('/signup');
  }
});

const CHOOGOOMI_CHARACTERS = [
  {
    choogoomiId: 'A',
    img: characterA,
    label: '지출제로형',
    summary: '"1원도 아끼는 생활을 실천하는 절약왕"',
    explain:
      "카페, 배달, 외식, 쇼핑… 지름 유혹이 넘쳐나는 지구에서도 콜리는 오직 필요한 순간에만 소비해.\n그 외엔 단 한 푼도 쓰지 않지!\n\"오늘 하루도 0원 도전 완료!\"\n'지출 없는 하루'를 목표로 매주 외식/쇼핑/배달 내역을 깔끔하게 '0'으로 채워가는 콜리.\n콜리에게 절약은 의무가 아닌 성장 루틴, 나무처럼 묵묵히 자라며 지출 제로의 경지에 도전하는 '지출제로형'이 바로 너야!",
  },
  {
    choogoomiId: 'B',
    img: characterB,
    label: '합리소비형',
    summary: '"소소한 행복은 지키되, 낭비는 줄이는 실속파"',
    explain:
      '롤로별에서 온 라무는 긍정 에너지가 가득한 자유로운 라마!\n일상에서 소소한 행복(커피, 외식 등)은 즐기지만 불필요한 낭비와 충동구매는 단호하게 거절하는 합리적 소비파야.\n"오늘 하루도 충분히 행복해!"\n라무는 가계부와 예산을 챙기며 실속을 추구하지만,긍정적 마인드로 낭비에 흔들리지 않는 멋진 실속러!',
  },
  {
    choogoomiId: 'C',
    img: characterC,
    label: '저축실천형',
    summary: '"비상금, 내 집 마련 등 뚜렷한 목표 저축을 실천하는 마스터"',
    explain:
      "비비는 단순히 돈을 모으는 게 아니야.\n'비상금 50만원', '1년 안에 여행비 100만원', '내 집 마련 종잣돈'처럼 구체적인 목표를 세우고, 그걸 실천 가능한 계획으로 바꿔나가.\n이번 주 10만원 모으기, 수입의 20% 자동이체, 잔돈 남김없이 이체하기, 새로운 적금 계좌 만들기까지— 작은 습관 하나도 미래를 바꾸는 시작이라고 믿는 비비.\n\"매달 조금씩 쌓이는 숫자들이 내일의 나를 도와줄 거야!\"\n누구보다 따뜻하고 책임감 있게 행동으로 저축을 실천하는 당신, 바로 저축실천형이야!",
  },
  {
    choogoomiId: 'D',
    img: characterD,
    label: '투자도전형',
    summary: '"작은 돈으로도 투자에 도전하고 배우는 재테크 입문러"',
    explain:
      '주식, ETF, 코인… 아직 실전 경험은 부족하지만, 투자 기회를 먼저 발견하고, 먼저 기록하고, 먼저 시도하는 열정 넘치는 초보 투자러야.\n뉴스 기사 요약부터 투자 용어 메모, 기업 조사, 퀴즈 학습, 투자 회고까지— 아거에게 투자란 단순한 돈벌이가 아닌 습관과 성장의 과정이야.\n실패해도 "괜찮아, 이건 경험치니까!"\n금요일 밤이면 오늘도 한 줄 회고를 남기며, 스스로를 점검하는 \'지식형 투자도전자\', 그게 바로 투자도전형, 포스아거!',
  },
  {
    choogoomiId: 'E',
    img: characterE,
    label: '금융탐구형',
    summary: '"궁금한 건 바로 검색하고 실천하는 금융 루틴러"',
    explain:
      '오늘은 계좌를 연결하고, 내일은 뉴스 속 금융 이슈를 요약하고, 주말엔 퀴즈로 금융 용어까지 복습하는 금융 루틴 실천러, 그게 바로 키키야!\n"잘 몰라도 괜찮아, 알아가면 되지!"\n키키는 모르는 걸 두려워하지 않아.\n궁금하면 바로 검색하고, 퀴즈로 테스트하고, 소액이라도 써보고, 안 쓰는 날은 기록으로 남겨.\n금융 탐색 → 학습 → 행동 → 피드백 이 사이클을 꾸준히 반복하며 오늘도 한 걸음씩 성장하는 금융탐구형.\n아직은 준비 중이지만, 누구보다 멀리 갈 준비가 된 너야!',
  },
];

const select = idx => {
  selected.value = idx;
  const selectedChar = CHOOGOOMI_CHARACTERS.find(
    char => char.choogoomiId === idx
  );

  // 전달받은 회원가입 데이터에 선택한 캐릭터 정보 추가
  if (signupData.value) {
    signupData.value.choogooMi = selectedChar.choogoomiId;
    profileImage.value = selectedChar.img;
    console.log('최종 회원가입 데이터:', signupData.value);
  }

  isModalOpen.value = true;
};

// 이미지 경로를 File 객체로 변환하는 함수
const imagePathToFile = async imagePath => {
  try {
    // 이미지 fetch
    const response = await fetch(imagePath);
    const blob = await response.blob();

    // 파일명 추출 (예: A.png)
    const filename = imagePath.split('/').pop();

    // File 객체 생성
    const file = new File([blob], filename, { type: blob.type });
    return file;
  } catch (error) {
    console.error('이미지 파일 변환 실패:', error);
    return null;
  }
};

// 캐릭터 선택 확정 및 회원가입 API 호출
const confirmSelection = async () => {
  try {
    if (signupData.value) {
      const profileImageFile = await imagePathToFile(profileImage.value);
      signupData.value.profileImage = profileImageFile;
      if (!signupData.value.profileImage) {
        return;
      }
      await authApi.signup(signupData.value);
      // 회원가입 성공 시 성공 모달 표시
      isSuccessModalOpen.value = true;
    }
  } catch (error) {
    console.error('회원가입 실패:', error);
    // 에러 처리 - 에러 모달 표시
    isErrorModalOpen.value = true;
  } finally {
    isModalOpen.value = false;
  }
};

// 선택된 캐릭터 정보
const selectedCharacter = computed(() => {
  return selected.value !== null
    ? CHOOGOOMI_CHARACTERS.find(char => char.choogoomiId === selected.value)
    : null;
});

const goToSignup = () => {
  isErrorModalOpen.value = false;
  router.push('/signup');
};

const goToHome = () => {
  isSuccessModalOpen.value = false;
  router.push('/');
};
</script>
