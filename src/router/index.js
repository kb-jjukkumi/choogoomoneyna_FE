import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/home/HomeView.vue';
import TransactionView from '@/views/home/TransactionView.vue';
import LoginView from '@/views/login/LoginView.vue';
import MatchingView from '@/views/matching/MatchingView.vue';
import MyPageView from '@/views/mypage/MyPageView.vue';
import RankingView from '@/views/ranking/RankingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/transaction/:bankName/:accountNumber/:type',
      name: 'transaction',
      component: TransactionView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: RankingView,
    },
    {
      path: '/matching',
      name: 'matching',
      component: MatchingView,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPageView,
    },
  ],
});

export default router;
