<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">📝 Notes App</h1>
        <h2 class="text-xl text-gray-600">Sign in to your account</h2>
      </div>

      <!-- Login Form -->
      <div class="bg-white py-8 px-6 shadow-lg rounded-lg">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email Field -->
          <Input
            id="email"
            v-model="form.email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            required
          />

          <!-- Password Field -->
          <Input
            id="password"
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            required
          />

          <!-- Submit Button -->
          <Button
            type="submit"
            variant="primary"
            full-width
          >
            Sign In
          </Button>
        </form>

        <!-- Form Data Display (for testing) -->
        <div class="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 class="text-sm font-medium text-gray-700 mb-2">Form Data (for testing):</h3>
          <pre class="text-xs text-gray-600">{{ JSON.stringify(formDisplay, null, 2) }}</pre>
        </div>

        <!-- Footer Links -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <NuxtLink to="/register" class="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Form data
const form = ref({
  email: '',
  password: ''
})

// Display form data without showing password
const formDisplay = computed(() => ({
  email: form.value.email,
  password: form.value.password ? '***hidden***' : ''
}))

// Handle form submission (no backend yet)
const handleSubmit = () => {
  console.log('Form submitted:', form.value)
  
  // Simple validation
  if (!form.value.email || !form.value.password) {
    alert('Please fill in all fields')
    return
  }
  
  // Show success message for now
  alert(`Login attempt with email: ${form.value.email}`)
}
</script>