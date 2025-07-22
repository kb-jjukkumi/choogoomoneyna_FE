<template>
  <div class="main_wrapper bg-ivory">
    <!-- 상단 로고 -->

    <!-- 프로필 박스 -->
    <div class="profile">
      <!-- 프로필 캐릭터 -->
      <img
        :src="character_savings"
        alt="저축실천형 캐릭터"
        class="profile_character"
      />
      <!-- 추구미 유형명 -->
      <span class="profile_type">저축실천형</span>
      <!-- 닉네임 -->
      <h2 class="profile_name">카카오대학교라이언</h2>

      <!-- 레벨 박스 -->
      <div class="profile_levelbar">
        <!-- 레벨 표시 바 - 전체 -->
        <div class="levelbar_bar">
          <!-- 레벨 표시 바 - 현재 레벨 -->
          <div class="bar_fill"></div>
        </div>
        <!-- 현재 레벨 & 점수 -->
        <div class="levelbar_level">Lv.2 / 410점</div>
      </div>

      <!-- 현재 순위 & 최근 성적 -->
      <div class="profile_rank">
        <div>
          <span class="rank_title">현재 순위</span><br /><span
            class="text-green"
            >5위</span
          >
        </div>
        <div>
          <span class="rank_title">최근 성적</span><br /><span
            class="text-green"
            >3승 2패</span
          >
        </div>
      </div>
    </div>

    <!-- 연동 계좌 목록 박스 -->
    <div class="accountlist w-full">
      <h3>연동 계좌 목록</h3>

      <!-- 연동 계좌 목록 -->
      <!-- 계좌 목록의 길이가 '374px'을 넘어가면 스크롤 처리 -->
      <div class="accounts max-h-[374px] overflow-y-auto">
        <div
          v-for="(account, i) in accounts"
          :key="i"
          @click="goToTransaction(account)"
          class="account"
        >
          <!-- 은행 로고 -->
          <img :src="account.logo" class="account_logo" alt="은행 로고" />
          <!-- 계좌 정보 -->
          <div class="account_info">
            <p class="account_type">{{ account.type }}</p>
            <p>{{ account.bankName }} {{ account.accountNumber }}</p>
            <p class="account_balance">
              {{ account.balance.toLocaleString() }}원
            </p>
          </div>
          <!-- 새로고침 -->
          <div class="account_refresh">
            {{ account.date }}
            <div class="refresh_wrapper">
              <img :src="icon_refresh" alt="새로고침 아이콘" />
            </div>
          </div>
        </div>
      </div>

      <!-- 계좌 추가 버튼 -->
      <div class="account_add">
        <img :src="icon_plus" alt="추가하기 아이콘" class="icon_plus" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import bank_kakao from '@/assets/img/banks/bank_kakao.png';
import bank_kb from '@/assets/img/banks/bank_kb.png';
import bank_shinhan from '@/assets/img/banks/bank_shinhan.png';
import bank_woori from '@/assets/img/banks/bank_woori.png';
import character_savings from '@/assets/img/characters/savings.png';
import icon_plus from '@/assets/img/icons/feature/icon_plus.png';
import icon_refresh from '@/assets/img/icons/feature/icon_refresh.png';

const router = useRouter();

const accounts = [
  {
    logo: bank_kb,
    type: '입출금',
    bankName: '국민',
    accountNumber: '2452-12-24521',
    balance: 500000,
    date: '2025.07.16 14:22',
  },
  {
    logo: bank_shinhan,
    type: '입출금',
    bankName: '신한',
    accountNumber: '2452-12-24521',
    balance: 500000,
    date: '2025.07.16 14:22',
  },
  {
    logo: bank_kakao,
    type: '입출금',
    bankName: '카카오',
    accountNumber: '2452-12-24521',
    balance: 500000,
    date: '2025.07.16 14:22',
  },
  {
    logo: bank_woori,
    type: '입출금',
    bankName: '우리',
    accountNumber: '2452-12-24521',
    balance: 500000,
    date: '2025.07.16 14:22',
  },
];

const goToTransaction = account => {
  router.push({
    name: 'transaction',
    params: {
      bankName: account.bankName,
      accountNumber: account.accountNumber,
    },
    query: {
      balance: account.balance,
    },
  });
};
</script>

<style scoped>
/* 프로필 박스 */
.profile {
  margin: 80px 0 30px;
}

/* 프로필 캐릭터 */
.profile_character {
  width: 250px;
  margin: 0 auto;
}

/* 추구미 유형명 */
.profile_type {
  display: block;
  background: var(--color-green);
  color: var(--color-ivory);
  margin: -20px auto 0;
  padding: 6px 20px;
  width: 150px;
  border-radius: 20px;
  font-size: 23px;
  text-align: center;
  letter-spacing: 1px;
}

/* 닉네임 */
.profile_name {
  font-size: 35px;
  text-align: center;
  margin: 30px auto 20px;
}

/* 레벨 박스 */
.profile_levelbar {
  border-radius: 12px;
  padding: 10px;
}

/* 레벨 표시 바 - 전체 */
.levelbar_bar {
  background: var(--color-limegreen-100);
  border-radius: 12px;
  width: 400px;
  height: 15px;
  overflow: hidden;
  margin: 10px auto;
}

/* 레벨 표시 바 - 현재 레벨 */
.bar_fill {
  background: var(--color-green);
  width: 50%;
  height: 100%;
  border-radius: 12px;
}

/* 현재 레벨 & 점수 */
.levelbar_level {
  font-size: 20px;
  margin: 10px auto;
  text-align: center;
}

/* 현재 순위 & 최근 성적 */
.profile_rank {
  display: flex;
  margin: auto 200px;
  justify-content: space-between;
  text-align: center;
  font-size: 28px;
  color: #555;
}

/* 현재 순위 & 최근 성적 타이틀 */
.rank_title {
  font-size: 25px;
}

/* 연동 계좌 목록 박스 */
.accountlist {
  background: var(--color-limegreen-500);
  padding: 2vh 3vh;
  border-radius: 50px 50px 0 0;
  width: calc(100vh * 390 / 844);
  height: 620px;
}

/* 연동 계좌 목록 타이틀 */
.accountlist h3 {
  font-size: 35px;
  color: var(--color-limegreen-900);
  width: 100%;
  padding: 2vh 0;
}

/* 연동 계좌 목록 - 스크롤바 숨기기 */
.accounts::-webkit-scrollbar {
  display: none;
}
.accounts {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}

/* 연동 계좌 */
.account {
  background: var(--color-ivory);
  border-radius: 20px;
  padding: 15px 25px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

/* 은행 로고 */
.account_logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

/* 계좌 정보 */
.account_info {
  flex: 1;
  margin-left: 30px;
}

/* 계좌타입, 은행명, 잔고 */
.account_info p {
  color: var(--color-limegreen-900);
  margin-bottom: 2px;
  line-height: 1.3;
  font-size: 17px;
}

/* 계좌 타입 */
.account_info .account_type {
  color: var(--color-limegreen-600);
  background-color: var(--color-limegreen-100);
  width: fit-content;
  margin-left: -6px;
  padding: 2px 0 2px 5px;
  border-radius: 3px;
  /* 글씨 크기 조정 */
  font-size: 12px;
  transform: scale(0.8);
}

/* 계좌 잔고 */
.account_info .account_balance {
  color: var(--color-limegreen-800);
  font-size: 20px;
}

/* 새로고침 시간 */
.account_refresh {
  color: #999;
  text-align: right;
  display: flex;
  align-items: flex-end;
  margin-top: -30px;
  gap: 6px;
  font-size: 12px;
  transform: scale(0.75);
}

/* 새로고침 아이콘 테두리 */
.refresh_wrapper {
  width: 22px;
  height: 22px;
  border: 1px solid var(--color-gray-300);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 새로고침 아이콘 */
.account_refresh img {
  width: 12px;
  height: 12px;
}

/* 계좌 추가 버튼 */
.account_add {
  background: var(--color-ivory);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  margin-top: 20px;
  border-radius: 20px;
}

/* 계좌 추가 아이콘 */
.icon_plus {
  width: 45px;
  height: 45px;
  margin: 12px;
}
</style>
