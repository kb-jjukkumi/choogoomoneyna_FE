<!-- src/views/TransactionView.vue -->
<template>
  <div class="transaction-view">
    <!-- 뒤로가기 -->
    <button class="back-button" @click="$router.back()">←</button>

    <!-- 계좌 정보 -->
    <div class="account-box">
      <p class="account-type">입출금</p>
      <p class="account-number">{{ bankName }} {{ accountNumber }}</p>
      <p class="balance">{{ formattedBalance }}원</p>
    </div>

    <!-- 거래 내역 -->
    <div class="transaction-list">
      <div class="header">
        <h3>거래 내역</h3>
        <select v-model="selectedType">
          <option value="전체">전체</option>
          <option value="입금">입금</option>
          <option value="출금">출금</option>
        </select>
      </div>

      <div
        class="transaction-item"
        v-for="(item, index) in filteredTransactions"
        :key="index"
      >
        <p class="date">{{ item.date }}</p>
        <p class="desc">{{ item.desc }}</p>
        <p
          class="amount"
          :class="{ out: item.type === '출금', in: item.type === '입금' }"
        >
          {{ item.type }} {{ item.amount.toLocaleString() }}원
        </p>
        <p class="after">잔액 {{ item.after.toLocaleString() }}원</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const bankName = route.params.bankName;
const accountNumber = route.params.accountNumber;
const balance = Number(route.query.balance || 0);

const formattedBalance = computed(() => balance.toLocaleString());

// 필터용
const selectedType = ref('전체');

// 거래 내역 리스트 (예시 하드코딩)
const transactions = ref([
  {
    date: '2025.07.15 12:52:33',
    desc: '메머드 커피',
    type: '출금',
    amount: 1300,
    after: 500000,
  },
  {
    date: '2025.07.15 12:52:33',
    desc: '스타벅스',
    type: '출금',
    amount: 4300,
    after: 501300,
  },
  {
    date: '2025.07.15 12:52:33',
    desc: '이자 입금',
    type: '입금',
    amount: 1000,
    after: 505600,
  },
]);

// 필터링된 거래 내역
const filteredTransactions = computed(() => {
  if (selectedType.value === '전체') return transactions.value;
  return transactions.value.filter(t => t.type === selectedType.value);
});
</script>

<style scoped>
.transaction-view {
  padding: 20px;
  background: #f9f9f9;
  min-height: 100vh;
}

.back-button {
  background: none;
  border: none;
  font-size: 20px;
  margin-bottom: 10px;
  cursor: pointer;
}

.account-box {
  background: #dbe9bb;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 24px;
}

.account-type {
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
}

.account-number {
  font-weight: bold;
}

.balance {
  font-size: 18px;
  font-weight: bold;
  color: #2e7d32;
}

.transaction-list .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.transaction-item {
  background: #eef6e5;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.date {
  font-size: 12px;
  color: #666;
}

.desc {
  font-weight: bold;
  margin-top: 4px;
}

.amount {
  font-weight: bold;
  margin-top: 4px;
}

.amount.out {
  color: #c62828;
}

.amount.in {
  color: #2e7d32;
}

.after {
  font-size: 12px;
  color: #888;
  margin-top: 2px;
}
</style>
