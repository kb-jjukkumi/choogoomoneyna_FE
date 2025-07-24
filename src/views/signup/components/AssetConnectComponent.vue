<template>
  <div class="min-h-screen bg-ivory flex flex-col">
    <!-- 상단 타이틀 -->
    <div class="w-full h-20 flex items-center justify-center">
      <p class="text-2xl text-limegreen-900 font-bold">자산 연동</p>
    </div>

    <!-- 은행 정보 -->
    <div class="px-6 mb-6">
      <div class="bg-white rounded-lg p-4 border-2 border-limegreen-500">
        <div class="flex items-center gap-4">
          <img :src="bankIcon" :alt="bankName" class="w-12 h-12" />
          <div>
            <p class="text-lg font-bold text-limegreen-900">{{ bankName }}</p>
            <p class="text-sm text-gray-600">선택된 은행</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 연동 폼 -->
    <div class="flex-1 px-6">
      <form @submit.prevent="connectAsset" class="space-y-6">
        <div>
          <label class="block text-lg font-bold text-limegreen-900 mb-2">
            아이디
          </label>
          <input
            v-model="userBankId"
            type="text"
            placeholder="은행 아이디를 입력해주세요"
            class="w-full h-14 px-4 border-2 border-limegreen-500 rounded-lg bg-white"
            required
          />
        </div>

        <div>
          <label class="block text-lg font-bold text-limegreen-900 mb-2">
            비밀번호
          </label>
          <input
            v-model="userBankPassword"
            type="password"
            placeholder="은행 비밀번호를 입력해주세요"
            class="w-full h-14 px-4 border-2 border-limegreen-500 rounded-lg bg-white"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="isInputEmpty || isConnecting"
          class="w-full bg-limegreen-500! h-14! text-limegreen-900! rounded-[10px] py-3 mt-4 text-2xl! disabled:opacity-50"
        >
          {{ isConnecting ? '연결 중...' : '자산 연결' }}
        </button>
      </form>
    </div>

    <!-- 연결 결과 모달 -->
    <ConnectModal
      v-if="isModalOpen"
      :title="modalType === false ? '자산 연동 실패' : '자산 연동 성공!'"
      :message="
        modalType === false
          ? `${bankName} 자산 연동에 실패했습니다. 다시 시도해주세요.`
          : `${bankName} 자산 연동에 성공했습니다!`
      "
      @close="handleModalClose"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import axiosInstance from '@/api/axios';

import ConnectModal from '../../asset/connect/components/ConnectModal.vue';

// Props 정의
const props = defineProps({
  allData: { type: Object, required: true },
  selectedBankId: { type: String, required: true },
});

// Emit 정의
const emit = defineEmits(['next']);

// 전달받은 누적 데이터 확인
console.log('🔗 AssetConnect에서 받은 누적 데이터:', props.allData);

// 폼 데이터
const userBankId = ref('');
const userBankPassword = ref('');

// 상태 관리
const isConnecting = ref(false);
const isModalOpen = ref(false);
const modalType = ref(true); // true: 성공, false: 실패

// 은행 정보 매핑
const bankInfo = {
  kb: { name: 'KB국민은행', icon: '/src/assets/img/icons/banks/bank_kb.png' },
  shinhan: {
    name: '신한은행',
    icon: '/src/assets/img/icons/banks/bank_shinhan.png',
  },
  woori: {
    name: '우리은행',
    icon: '/src/assets/img/icons/banks/bank_woori.png',
  },
  hana: { name: '하나은행', icon: '/src/assets/img/icons/banks/bank_hana.png' },
};

// Computed
const bankName = computed(() => {
  return bankInfo[props.selectedBankId]?.name || '선택된 은행';
});

const bankIcon = computed(() => {
  return bankInfo[props.selectedBankId]?.icon || '';
});

const isInputEmpty = computed(() => {
  return !userBankId.value.trim() || !userBankPassword.value.trim();
});

// 자산 연결 함수
const connectAsset = async () => {
  if (isConnecting.value) return; // 중복 요청 방지

  isConnecting.value = true;
  try {
    // API 호출 (임시로 주석 처리)
    // await axiosInstance.post('/api/codef/account/add', {
    //   bankId: props.selectedBankId,
    //   userBankId: userBankId.value,
    //   userBankPassword: userBankPassword.value,
    // });

    // 임시로 성공으로 처리
    modalType.value = true;
    isModalOpen.value = true;
  } catch (error) {
    console.error('자산 연동 실패:', error);
    modalType.value = false;
    isModalOpen.value = true;
  } finally {
    isConnecting.value = false;
  }
};

// 모달 닫기 핸들러
const handleModalClose = () => {
  isModalOpen.value = false;

  // 회원가입 플로우에서는 자산 연동 완료 후 캐릭터 선택으로 이동
  console.log('자산 연동 완료 - 캐릭터 선택으로 이동');
  emit('next');
};
</script>
