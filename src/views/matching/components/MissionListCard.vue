<template>
  <div class="bg-ivory p-4 rounded-2xl">
    <!--닉네임-->
    <span class="bg-limegreen-100 text-green px-2 py-1 rounded-full text-sm">
      {{ missions.userNickname }}
    </span>
    <!--미션목록-->
    <div class="flex flex-col mt-2 gap-2">
      <!--미션 하나-->
      <div
        class="flex justify-between bg-limegreen-100 p-1.5 rounded-[10px] items-center"
      >
        <div class="flex gap-2">
          <div
            class="bg-limegreen-500 rounded-lg w-5 h-5 justify-center text-center"
          >
            {{ index + 1 }}
          </div>
          <div class="text-sm text-green">{{ missions.missionTitle }}</div>
        </div>
        <div class="text-xs text-yellow mr-1">{{ missions.score }}점</div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  missions: { type: Object, required: true },
  index: { type: Number, required: true },
});

console.log(props.missions);
</script>
