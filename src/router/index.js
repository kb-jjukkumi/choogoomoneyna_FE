import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/home/HomeView.vue';
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
