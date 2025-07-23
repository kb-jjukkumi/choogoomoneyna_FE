<template>
  <div
    class="flex flex-col gap-3 bg-limegreen-100 px-4 py-6 rounded-lg text-center"
  >
    <div class="text-green">{{ question.question }}</div>
    <div class="text-limegreen-800 text-sm leading-6 whitespace-pre-line">
      {{ question.subtitle }}
    </div>
    <div
      class="grid gap-3 px-3"
      :class="question.type === 4 ? 'grid-cols-1' : 'grid-cols-2'"
    >
      <button
        v-for="(option, index) in question.options"
        :key="index"
        @click="$emit('select', option.value)"
        :class="[
          'flex justify-center border-2 border-limegreen-500 rounded-lg p-3 text-sm! h-11',
          selectedOption === option.value
            ? 'bg-limegreen-500 text-ivory'
            : 'bg-ivory text-limegreen-700 bg hover:bg-limegreen-500 hover:text-ivory',
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
