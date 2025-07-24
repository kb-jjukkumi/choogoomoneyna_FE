<template>
  <div
    class="flex flex-col gap-5 justify-center bg-limegreen-100 px-4 rounded-lg text-center h-100"
  >
    <div class="flex flex-col gap-3">
      <div class="text-green text-2xl">{{ 'Q' + question.id }}</div>
      <div class="text-limegreen-800 text-lg">{{ question.question }}</div>
    </div>
    <div
      :class="[
        'grid px-3 items-center',
        question.type === 4 ? 'grid-cols-1 h-50' : 'grid-cols-2 h-45 gap-5',
      ]"
    >
      <button
        v-for="(option, index) in question.options"
        :key="index"
        @click="$emit('select', option.value)"
        :class="[
          'flex justify-center items-center border-2 border-limegreen-500 rounded-lg p-3 text-sm! whitespace-pre-line',
          question.type === 2 ? 'h-35' : 'h-11',
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
