import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/home/HomeView.vue';
import TransactionView from '@/views/home/TransactionView.vue';
import LoginView from '@/views/login/LoginView.vue';
import MatchingView from '@/views/matching/MatchingView.vue';
import MissionQuizView from '@/views/matching/MissionQuizView.vue';
import MyPageView from '@/views/mypage/MyPageView.vue';
import RankingView from '@/views/ranking/RankingView.vue';
import SignupFlowView from '@/views/signup/SignupFlowView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/transaction/:bankId/:accountNum/:accountName',
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
      component: SignupFlowView,
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
      path: '/mission-quiz',
      name: 'missionQuiz',
      component: MissionQuizView,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPageView,
    },
  ],
});

// 라우터 가드
// router.beforeEach((to, from, next) => {
//   const accessToken = localStorage.getItem('accessToken');
//   const publicPages = [
//     '/login',
//     '/signup',
//     '/survey1',
//     '/survey2',
//     '/character-select',
//   ];
//   const assetPages = ['/asset/select', '/asset/connect'];
//   const authRequired =
//     !publicPages.includes(to.path) && !assetPages.includes(to.path);

//   if (accessToken) {
//     // 로그인 후: publicPages (asset 페이지 제외)에 접근 못하도록
//     if (publicPages.includes(to.path)) {
//       return next('/');
//     }
//   } else {
//     // 로그인 전: 인증이 필요한 페이지에 접근하면 로그인 페이지로 이동
//     if (authRequired) {
//       return next('/login');
//     }
//   }
//   next();
// });

export default router;
