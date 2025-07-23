<template>
  <div class="p-4 rounded-lg">
    <div class="font-semibold text-lg mb-4">{{ question.question }}</div>
    <div class="whitespace-pre-line">{{ question.subtitle }}</div>
    <div
      class="grid gap-3"
      :class="question.type === 4 ? 'grid-cols-1' : 'grid-cols-2'"
    >
      <button
        v-for="(option, index) in question.options"
        :key="index"
        @click="$emit('select', option.value)"
        :class="[
          'border rounded-lg p-3 text-sm',
          selectedOption === option.value
            ? 'bg-limegreen-200 border-limegreen-500 font-semibold'
            : 'bg-white',
        ]"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: Object,
  selectedOption: Number,
});

defineEmits(['select']);
</script>
