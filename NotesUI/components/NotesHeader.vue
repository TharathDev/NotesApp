<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex justify-between items-center h-14">
        <!-- Left side - Logo and Title -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-bold">D</span>
          </div>
          <h1 class="text-xl font-semibold text-gray-900">Notes</h1>
        </div>
        
        <!-- Right side - Search, New Note, User Info -->
        <div class="flex items-center space-x-4">
          <!-- Search Bar -->
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              :value="searchQuery"
              @input="$emit('update:searchQuery', $event.target.value)"
              type="text"
              placeholder="Search"
              class="pl-10 pr-4 py-2 w-80 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>
          
          <!-- New Note Button -->
          <button
            @click="$emit('createNote')"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center space-x-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>New Note</span>
          </button>
          
          <!-- User Info and Sign Out -->
          <div class="flex items-center space-x-3 pl-2">
            <span class="text-sm font-medium text-gray-700">{{ user?.username }}</span>
            <button
              @click="showSignOutConfirm"
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Sign Out Confirmation Modal -->
    <SignOutConfirmModal
      :show="showSignOutModal"
      @cancel="cancelSignOut"
      @confirm="confirmSignOut"
    />
  </nav>
</template>

<script setup lang="ts">
import SignOutConfirmModal from './SignOutConfirmModal.vue'

interface Props {
  searchQuery: string
  user: { username: string } | null
}

defineProps<Props>()
defineEmits<{
  'update:searchQuery': [value: string]
  'createNote': []
  'logout': []
}>()

const showSignOutModal = ref(false)

const showSignOutConfirm = () => {
  showSignOutModal.value = true
}

const cancelSignOut = () => {
  showSignOutModal.value = false
}

const confirmSignOut = () => {
  showSignOutModal.value = false
  $emit('logout')
}
</script>