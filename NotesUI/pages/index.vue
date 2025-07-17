<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">📝 Notes App</h1>
      <p class="text-gray-600 mb-6">Organize your thoughts and ideas</p>
      
      <div class="space-y-4">
        <NuxtLink
          to="/login"
          class="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-200"
        >
          Sign In
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="block w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-200"
        >
          Create Account
        </NuxtLink>
      </div>
    </div>
  </div>
</template>