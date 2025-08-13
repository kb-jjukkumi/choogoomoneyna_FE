<template>
  <div class="flex justify-center items-center h-screen">
    <LoadingScreen />
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

import { kakaoLogin, userInfo } from '@/api/authApi';
import LoadingScreen from '@/components/LoadingScreen.vue';

const route = useRoute();
const code = route.query.code;
const router = useRouter();

const handleKakaoLogin = async () => {
  try {
    await kakaoLogin(code);
    await userInfo();
    router.push('/');
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleKakaoLogin();
});
</script>
