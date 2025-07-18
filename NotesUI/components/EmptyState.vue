<template>
  <div class="text-center py-16">
    <div class="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
      <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
      </svg>
    </div>
    <h3 class="text-xl font-medium text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-gray-600 mb-6">{{ message }}</p>
    <button
      v-if="showButton"
      @click="$emit('createNote')"
      class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
    >
      Create Your First Note
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  message: string
  showButton?: boolean
}

withDefaults(defineProps<Props>(), {
  showButton: false
})

defineEmits<{
  'createNote': []
}>()
</script>