<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/70 z-20">
    <div
      class="bg-ivory rounded-4xl p-8 w-[40vh] flex flex-col items-center shadow-lg"
    >
      <div class="w-full flex justify-end">
        <button @click="$emit('close')">
          <img
            src="@/assets/img/icons/system/system_close.png"
            alt="close"
            class="w-8 h-8"
          />
        </button>
      </div>
      <div class="w-full flex items-center justify-center">
        <img
          :src="selectedCharacter.img"
          :alt="selectedCharacter.label"
          class="w-40 h-45 object-contain"
        />
      </div>
      <div class="text-limegreen-800 text-2xl font-bold">
        {{ selectedCharacter.label }}
      </div>
      <div class="w-10 h-[2px] bg-gray-100 m-4 rounded-full"></div>
      <div
        class="flex items-center justify-center w-full h-10 text-green text-xl m-4"
      >
        {{ selectedCharacter.summary }}
      </div>
      <div
        class="text-limegreen-800 mb-6 text-center whitespace-pre-line leading-relaxed max-w-full px-2 break-keep"
      >
        {{ selectedCharacter.explain }}
      </div>
      <button
        class="w-36 h-12 bg-limegreen-500 text-ivory rounded-lg py-2 text-xl!"
        @click="$emit('select')"
      >
        선택
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  selectedCharacter: { type: Object, required: true },
});

defineEmits(['close', 'select']);
</script>
