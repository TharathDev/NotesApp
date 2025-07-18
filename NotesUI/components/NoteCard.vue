<template>
  <div
    :class="[
      'relative p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1',
      cardColor
    ]"
    @click="$emit('edit', note)"
  >
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
        {{ note.title || 'Untitled' }}
      </h3>
      <p class="text-gray-700 text-sm line-clamp-4 leading-relaxed">
        {{ note.content || 'No content' }}
      </p>
    </div>
    
    <div class="flex justify-between items-center text-xs text-gray-600">
      <span>{{ formatDate(note.updatedAt) }}</span>
      <div class="flex items-center space-x-2">
        <button
          @click.stop="$emit('delete', note)"
          class="p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors"
          title="Delete note"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/composables/useNotes'

interface Props {
  note: Note
  cardColor: string
}

defineProps<Props>()
defineEmits<{
  'edit': [note: Note]
  'delete': [note: Note]
}>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>