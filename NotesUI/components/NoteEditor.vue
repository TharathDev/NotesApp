<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
      <div class="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ isNewNote ? 'Create New Note' : 'Edit Note' }}
        </h2>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="flex-1 p-6 overflow-y-auto">
        <div class="space-y-4">
          <input
            :value="note.title"
            @input="$emit('update:title', $event.target.value)"
            type="text"
            placeholder="Note title..."
            class="w-full text-xl font-semibold border-0 outline-none placeholder-gray-400 text-gray-900"
          />
          <textarea
            :value="note.content"
            @input="$emit('update:content', $event.target.value)"
            placeholder="Start writing your note..."
            rows="12"
            class="w-full border-0 outline-none resize-none placeholder-gray-400 text-gray-800 leading-relaxed"
          ></textarea>
        </div>
      </div>
      
      <div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="$emit('save')"
          :disabled="isSaving"
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSaving ? 'Saving...' : 'Save Note' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  note: { title?: string; content?: string }
  isNewNote: boolean
  isSaving: boolean
}

defineProps<Props>()
defineEmits<{
  'close': []
  'save': []
  'update:title': [value: string]
  'update:content': [value: string]
}>()
</script>