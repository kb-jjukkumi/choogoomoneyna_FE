<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="bg-ivory flex min-h-screen w-[390px] justify-center rounded-[10px] shadow-lg"
    >
      <!-- 메인 콘텐츠 영역에 상단 패딩 추가 -->
      <div class="w-full">
        <router-view />
      </div>
    </div>
  </div>
</template>
