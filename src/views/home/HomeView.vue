<template>
  <div>
    <TopNavigation />
    <div
      class="relative flex flex-col main_wrapper bg-ivory min-h-screen mt-20"
    >
      <!-- 프로필 박스 -->
      <div class="flex flex-col items-center">
        <!-- 프로필 캐릭터 -->
        <img
          :src="img_character"
          alt="지출제로형 캐릭터"
          class="w-[100px] mx-auto mt-8 mb-2"
        />
        <!-- 추구미 유형명 -->
        <span
          class="bg-green text-white px-2.5 py-[2px] rounded-full text-xs text-center tracking-wide"
        >
          지출제로형
        </span>
        <!-- 닉네임 -->
        <p class="text-limegreen-800 text-lg text-center my-[2px]">
          카카오대학교라이언
        </p>
        <!-- 레벨 박스 -->
        <div class="p-1 w-70 max-w-[400px] mx-auto">
          <!-- 레벨 표시 바 - 전체 -->
          <div class="bg-limegreen-100 h-[9px] rounded-xl mb-[2px]">
            <!-- 레벨 표시 바 - 현재 레벨 -->
            <div class="bg-green h-full w-1/2 rounded-xl"></div>
          </div>
          <!-- 현재 레벨 & 점수 -->
          <div class="text-center text-limegreen-700 text-xs">Lv.2 / 410점</div>
        </div>
        <!-- 현재 순위 & 최근 성적 -->
        <div
          class="flex justify-between text-center w-full max-w-[400px] px-30"
        >
          <div>
            <span class="text-[14px] text-limegreen-700">현재 순위</span><br />
            <span class="text-[17px] text-green">5위</span>
          </div>
          <div>
            <span class="text-[14px] text-limegreen-700">최근 성적</span><br />
            <span class="text-[17px] text-green">3승 2패</span>
          </div>
        </div>
      </div>
      <!-- 연동 계좌 목록 박스 -->
      <div
        class="flex flex-grow flex-col bg-limegreen-500 rounded-t-[30px] px-3 py-2 w-full h-full mt-4 mx-auto"
      >
        <p class="text-lg text-limegreen-900 pt-4 pb-3 px-4">연동 계좌 목록</p>
        <!-- 연동 계좌 목록 -->
        <!-- 계좌 목록의 길이가 '430px'을 넘어가면 스크롤 처리 -->
        <div
          class="max-h-[calc(100vh-550px)] overflow-scroll [&::-webkit-scrollbar]:hidden mb-1 px-3 space-y-2"
        >
          <div
            v-for="(account, i) in ACCOUNTS"
            :key="i"
            @click="goToTransaction(account)"
            class="bg-ivory rounded-xl px-3 py-2 flex items-center cursor-pointer"
          >
            <!-- 은행 로고 -->
            <img
              :src="account.bankLogo"
              alt="은행 로고"
              class="size-12 object-contain"
            />
            <!-- 계좌 정보 -->
            <div class="flex-1 flex-col ml-6">
              <p
                class="bg-limegreen-100 text-limegreen-600 text-[10px] px-2 py-[2px] rounded-[5px] w-fit"
              >
                {{ account.accountName }}
              </p>
              <p class="text-limegreen-900 text-[11px] my-[1px]">
                {{ account.bankName }} {{ account.accountNum }}
              </p>
              <p class="text-limegreen-800 text-[14px]">
                {{ Number(account.accountBalance).toLocaleString() }}원
              </p>
            </div>
            <!-- 새로고침 -->
            <div
              class="text-gray-300 text-[10px] flex items-end gap-1 scale-90 mt-[-35px]"
            >
              {{ account.date }}
              <div
                class="size-3.5 border rounded-full flex items-center justify-center"
              >
                <img :src="icon_refresh" alt="새로고침 아이콘" class="size-2" />
              </div>
            </div>
          </div>
        </div>
        <!-- 계좌 추가 버튼 -->
        <div
          class="bg-ivory rounded-xl my-1 mx-3 flex justify-center items-center cursor-pointer"
          @click="addAccount()"
        >
          <img :src="icon_plus" alt="추가하기 아이콘" class="size-7 m-1" />
        </div>
      </div>
    </div>
    <BottomNavigation />
    <CongsModal
      v-if="showModal"
      title="축하합니다! 
상위 랭크에 도달했어요."
      message="꾸준한 미션 수행으로 추구미를 향해 멋지게 성장하고 있어요 👏
       기프티콘 발송을 위해 휴대폰 번호를 입력해주세요.
       입력된 번호는 보상 발송 목적 외에는 사용되지 않으며, 사용 후 즉시 폐기됩니다."
      caution="‼️ 기회는 단 한 번뿐 ‼️
잘못 입력하면 보상을 받을 수 없어요."
      @submit="handlePhoneSubmit"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { fetchAccounts } from '@/api/bankApi';
import img_character from '@/assets/img/characters/character_zero_1.png';
import icon_plus from '@/assets/img/icons/feature/icon_plus.png';
import icon_refresh from '@/assets/img/icons/feature/icon_refresh.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import CongsModal from '@/components/CongsModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import { BANK_LIST } from '@/constants/bankList';

const router = useRouter();

// 계좌목록 데이터
const ACCOUNTS = ref([]);

const getBankInfo = bankId =>
  BANK_LIST.find(bank => bank.bankId === bankId || bank.id === bankId);

onMounted(async () => {
  try {
    const data = await fetchAccounts();

    // 계좌 목록에 은행 이름과 로고 추가
    ACCOUNTS.value = data.map(account => {
      const bankInfo = getBankInfo(account.bankId);
      return {
        ...account,
        bankLogo: bankInfo?.icon || '', // 은행 로고
        bankName: bankInfo?.name || '알 수 없음', // 은행 이름
      };
    });
  } catch (err) {
    console.error('계좌 가져오기 실패:', err);
  }
});

const goToTransaction = account => {
  router.push({
    name: 'transaction',
    params: {
      accountNum: account.accountNum,
      accountName: account.accountName,
      bankId: account.bankId, // 여기만 params
    },
    query: {
      accountBalance: account.accountBalance,
      bankName: account.bankName,
    },
  });
};

const addAccount = () => {
  router.push({
    name: 'assetSelect',
  });
};

const showModal = ref(true);

function handlePhoneSubmit(phoneNumber) {
  console.log('제출된 전화번호:', phoneNumber);
}
</script>
