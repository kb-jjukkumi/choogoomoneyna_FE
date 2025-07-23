<template>
  <div
    :class="[
      'flex flex-col items-center justify-center bg-limegreen-100 rounded-2xl border-3 cursor-pointer transition-all shadow-lg',
      selected ? 'border-limegreen-500' : 'border-limegreen-100',
      'w-32 h-40',
      'hover:shadow-md',
    ]"
    @click="$emit('click')"
  >
    <img :src="img" :alt="label" class="w-20 h-20 mb-2 object-contain" />
    <span :class="['text-sm text-center font-bold text-limegreen-900']">
      {{ label }}
    </span>
    <span
      v-if="characterName"
      :class="['text-xs text-center text-gray-600 mt-1']"
    >
      {{ characterName }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  img: { type: String, required: true },
  label: { type: String, required: true },
  characterName: { type: String, default: '' },
  selected: { type: Boolean, default: false },
});

defineEmits(['click']);
</script>
