<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold">My Notes</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">Welcome, {{ user?.username }}</span>
            <Button @click="handleLogout" variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
    
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
          <div class="text-center">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Notes Dashboard</h2>
            <p class="text-gray-600">Your notes will appear here.</p>
            <p class="text-sm text-gray-500 mt-2">Connected to API at: http://localhost:5197</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { user, logout, isAuthenticated } = useAuth()

// Redirect if not authenticated
watchEffect(() => {
  if (!isAuthenticated.value) {
    navigateTo('/login')
  }
})

const handleLogout = async () => {
  logout()
  await navigateTo('/login')
}
</script>