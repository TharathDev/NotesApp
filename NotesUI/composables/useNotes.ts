import { useAuth } from './useAuth'

export interface Note {
  id: number
  title: string
  content: string
  userId: number
  createdAt: string
  updatedAt: string
}

export interface CreateNoteRequest {
  title: string
  content: string
}

export interface UpdateNoteRequest {
  title: string
  content: string
}

export const useNotes = () => {
  const { getAuthHeaders } = useAuth()
  const config = useRuntimeConfig()
  
  const notes = ref<Note[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  const fetchNotes = async (): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await $fetch<Note[]>(`${config.public.apiBaseUrl}/notes`, {
        headers: getAuthHeaders()
      })
      
      notes.value = response
      return true
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch notes'
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  const createNote = async (noteData: CreateNoteRequest): Promise<boolean> => {
    try {
      const response = await $fetch<Note>(`${config.public.apiBaseUrl}/notes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: noteData
      })
      
      notes.value.unshift(response)
      return true
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to create note'
      return false
    }
  }
  
  const updateNote = async (id: number, noteData: UpdateNoteRequest): Promise<boolean> => {
    try {
      const response = await $fetch<Note>(`${config.public.apiBaseUrl}/notes/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: noteData
      })
      
      const index = notes.value.findIndex(note => note.id === id)
      if (index !== -1) {
        notes.value[index] = response
      }
      
      return true
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to update note'
      return false
    }
  }
  
  const deleteNote = async (id: number): Promise<boolean> => {
    try {
      await $fetch(`${config.public.apiBaseUrl}/notes/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      notes.value = notes.value.filter(note => note.id !== id)
      return true
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to delete note'
      return false
    }
  }
  
  return {
    notes: readonly(notes),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchNotes,
    createNote,
    updateNote,
    deleteNote
  }
}


// Add this helper function to format dates in Cambodia timezone
export const formatCambodiaTime = (utcDateString: string): string => {
  const date = new Date(utcDateString);
  return date.toLocaleString('en-US', {
    timeZone: 'Asia/Phnom_Penh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};