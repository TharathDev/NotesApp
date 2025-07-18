<template>
  <div class="min-h-screen bg-gray-50">
    <NotesHeader
      v-model:search-query="searchQuery"
      :user="user"
      @create-note="createNewNote"
      @logout="handleLogout"
    />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="isLoadingNotes" class="flex justify-center items-center h-64">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <p class="text-gray-600">Loading your notes...</p>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="notesError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        {{ notesError }}
        <button @click="fetchNotes" class="ml-2 underline">Try Again</button>
      </div>
      
      <!-- Empty State -->
      <EmptyState
        v-else-if="filteredNotes.length === 0 && !searchQuery"
        title="No notes yet"
        message="Start by creating your first note"
        :show-button="true"
        @create-note="createNewNote"
      />
      
      <!-- No Search Results -->
      <EmptyState
        v-else-if="filteredNotes.length === 0 && searchQuery"
        title="No notes found"
        message="Try adjusting your search terms"
      />
      
      <!-- Notes Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <NoteCard
          v-for="(note, index) in filteredNotes"
          :key="note.id"
          :note="note"
          :card-color="getCardColor(index)"
          @edit="editNote"
          @delete="showDeleteConfirm"
        />
      </div>
    </main>
    
    <!-- Note Editor Modal -->
    <NoteEditor
      :show="showEditor"
      :note="editingNote"
      :is-new-note="isNewNote"
      :is-saving="isSaving"
      @close="closeEditor"
      @save="saveNote"
      @update:title="editingNote.title = $event"
      @update:content="editingNote.content = $event"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      :show="showDeleteModal"
      :note-title="noteToDelete?.title"
      :is-deleting="isDeleting"
      @cancel="cancelDelete"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { useNotes, type Note } from '~/composables/useNotes'
import NotesHeader from '~/components/NotesHeader.vue'
import NoteCard from '~/components/NoteCard.vue'
import EmptyState from '~/components/EmptyState.vue'
import NoteEditor from '~/components/NoteEditor.vue'
import DeleteConfirmModal from '~/components/DeleteConfirmModal.vue'

const { user, logout, isAuthenticated } = useAuth()
const { notes, isLoading: isLoadingNotes, error: notesError, fetchNotes, createNote, updateNote, deleteNote } = useNotes()

const searchQuery = ref('')
const showEditor = ref(false)
const editingNote = ref<Partial<Note>>({})
const isNewNote = ref(false)
const isSaving = ref(false)
const showDeleteModal = ref(false)
const noteToDelete = ref<Note | null>(null)
const isDeleting = ref(false)

const filteredNotes = computed(() => {
  if (!searchQuery.value) return notes.value
  
  const query = searchQuery.value.toLowerCase()
  return notes.value.filter(note => 
    note.title.toLowerCase().includes(query) || 
    note.content.toLowerCase().includes(query)
  )
})

const cardColors = [
  'bg-yellow-200',
  'bg-orange-200', 
  'bg-green-200',
  'bg-purple-200',
  'bg-blue-200',
  'bg-pink-200',
  'bg-indigo-200',
  'bg-red-200'
]

const getCardColor = (index: number) => {
  return cardColors[index % cardColors.length]
}

watchEffect(() => {
  if (!isAuthenticated.value) {
    navigateTo('/login')
  }
})

onMounted(() => {
  if (isAuthenticated.value) {
    fetchNotes()
  }
})

const handleLogout = async () => {
  logout()
  await navigateTo('/login')
}

const createNewNote = () => {
  editingNote.value = {
    title: '',
    content: ''
  }
  isNewNote.value = true
  showEditor.value = true
}

const editNote = (note: Note) => {
  editingNote.value = { ...note }
  isNewNote.value = false
  showEditor.value = true
}

const closeEditor = () => {
  showEditor.value = false
  editingNote.value = {}
  isNewNote.value = false
}

const saveNote = async () => {
  if (!editingNote.value.title && !editingNote.value.content) {
    return
  }
  
  isSaving.value = true
  
  try {
    if (isNewNote.value) {
      const success = await createNote({
        title: editingNote.value.title || '',
        content: editingNote.value.content || ''
      })
      
      if (success) {
        closeEditor()
      }
    } else {
      const success = await updateNote(editingNote.value.id!, {
        title: editingNote.value.title || '',
        content: editingNote.value.content || ''
      })
      
      if (success) {
        closeEditor()
      }
    }
  } catch (error) {
    console.error('Error saving note:', error)
  } finally {
    isSaving.value = false
  }
}

const showDeleteConfirm = (note: Note) => {
  noteToDelete.value = note
  showDeleteModal.value = true
}

const cancelDelete = () => {
  showDeleteModal.value = false
  noteToDelete.value = null
}

const confirmDelete = async () => {
  if (!noteToDelete.value) return
  
  isDeleting.value = true
  
  try {
    const success = await deleteNote(noteToDelete.value.id)
    if (success) {
      showDeleteModal.value = false
      noteToDelete.value = null
    }
  } catch (error) {
    // Remove lines 189 and 217:
    // console.error('Error saving note:', error)
    // console.error('Error deleting note:', error)
  } finally {
    isDeleting.value = false
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
