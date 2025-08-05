import { createRouter, createWebHistory } from 'vue-router';

import { userInfo } from '@/api/authApi';
import { useAuthStore } from '@/stores/authStore';
import AssetConnectView from '@/views/asset/AssetConnectView.vue';
import AssetSelectView from '@/views/asset/AssetSelectView.vue';
import AssetReportView from '@/views/asset/report/AssetReportView.vue';
import ChoogooMiSelectView from '@/views/choogoomi/ChoogooMiSelectView.vue';
import HomeView from '@/views/home/HomeView.vue';
import TransactionView from '@/views/home/TransactionView.vue';
import LoginView from '@/views/login/LoginView.vue';
import FindPasswordView from '@/views/login/password/FindPasswordView.vue';
import MatchingView from '@/views/matching/MatchingView.vue';
import MissionQuizView from '@/views/matching/MissionQuizView.vue';
import MissionWriteView from '@/views/matching/MissionWriteView.vue';
import MyPageAssetReportView from '@/views/mypage/components/report/AssetReportView.vue';
import MyPageEditInfoView from '@/views/mypage/MyPageEditInfoView.vue';
import MyPageRecordView from '@/views/mypage/MyPageRecordView.vue';
import MyPageView from '@/views/mypage/MyPageView.vue';
import RankingView from '@/views/ranking/RankingView.vue';
import SurveyView from '@/views/signup/components/survey/SurveyView.vue';
import SignupView from '@/views/signup/SignupView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: async (to, from, next) => {
        try {
          const userData = await userInfo();
          // 츄고미 미선택 시 설문조사로 리다이렉트
          if (userData.choogooMi === 'O') {
            return next('/survey');
          }
          next();
        } catch (error) {
          console.error('사용자 정보 조회 실패:', error);
          // 에러 발생 시 이전 페이지로 리디렉트
          next(false);
        }
      },
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
      path: '/find-password',
      name: 'findPassword',
      component: FindPasswordView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/survey',
      name: 'survey',
      component: SurveyView,
    },
    {
      path: '/asset/select',
      name: 'assetSelect',
      component: AssetSelectView,
    },
    {
      path: '/asset/select/:bankId',
      name: 'assetConnect',
      component: AssetConnectView,
    },
    {
      path: '/asset/report',
      name: 'assetReport',
      component: AssetReportView,
    },
    {
      path: '/choogoomi',
      name: 'choogoomi',
      component: ChoogooMiSelectView,
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
      path: '/mission-write',
      name: 'missionWrite',
      component: MissionWriteView,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPageView,
    },
    {
      path: '/mypage/editInfo',
      name: 'mypageEditInfo',
      component: MyPageEditInfoView,
    },
    {
      path: '/mypage/record',
      name: 'mypageRecord',
      component: MyPageRecordView,
    },
    {
      path: '/mypage/asset-report',
      name: 'mypageAssetReport',
      component: MyPageAssetReportView,
    },
  ],
});

// ✅ 요청하신 테스트 시나리오에 맞는 라우터 가드
router.beforeEach(async (to, from, next) => {
  // ✅ AuthStore에서 로그인 상태 확인
  const authStore = useAuthStore();
  const isLoggedIn = authStore.isLoggedIn;

  // 공개 페이지 정의
  const publicPages = ['/login', '/signup', '/find-password'];

  console.log('🚦 Router Guard:', {
    to: to.path,
    isLoggedIn,
  });

  if (isLoggedIn) {
    // ✅ 로그인된 상태에서의 처리
    if (publicPages.includes(to.path)) {
      // ✅ /login → / 리디렉트
      // ✅ /signup → / 리디렉트
      console.log('로그인된 사용자가 공개 페이지 접근 → 홈으로 리디렉트');
      return next('/');
    }

    // ✅ / → 접근 허용
    // ✅ /mypage → 접근 허용
    console.log('로그인된 사용자 → 접근 허용');
    return next();
  } else {
    // ✅ 로그인되지 않은 상태에서의 처리
    if (publicPages.includes(to.path)) {
      // ✅ /login → 접근 허용
      // ✅ /signup → 접근 허용
      console.log('미로그인 사용자 → 공개 페이지 접근 허용');
      return next();
    }

    // ✅ / → /login으로 리디렉트
    // ✅ /mypage → /login으로 리디렉트
    console.log('미로그인 사용자가 보호된 페이지 접근 → 로그인으로 리디렉트');
    return next('/login');
  }
});
export default router;
