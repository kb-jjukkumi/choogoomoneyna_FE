import { createRouter, createWebHistory } from 'vue-router';

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
      redirect: '/login',
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

  if (authRequired && !accessToken) {
    return next('/login');
  }
  if (to.path === '/login' && accessToken) {
    return next('/home');
  }
  next();
});

export default router;
