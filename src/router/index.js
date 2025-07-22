import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/home/HomeView.vue';
import TransactionView from '@/views/home/TransactionView.vue';
import LoginView from '@/views/login/LoginView.vue';
import MatchingView from '@/views/matching/MatchingView.vue';
import MyPageView from '@/views/mypage/MyPageView.vue';
import RankingView from '@/views/ranking/RankingView.vue';
import SignupView from '@/views/signup/SignupView.vue';
import SurveyView1 from '@/views/signup/SurveyView1.vue';
import SurveyView2 from '@/views/signup/SurveyView2.vue';

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
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/survey1',
      name: 'survey1',
      component: SurveyView1,
    },
    {
      path: '/survey2',
      name: 'survey2',
      component: SurveyView2,
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

// 라우터 가드
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken');
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);

  // localStorage에 accessToken이 없으면 로그인 페이지로 이동
  if (authRequired && !accessToken) {
    return next('/login');
  }
  // localStorage에 accessToken이 있으면 메인 페이지로 이동
  if (to.path === '/login' && accessToken) {
    return next('/home');
  }
  next();
});

export default router;
