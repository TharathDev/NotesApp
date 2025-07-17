<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">📝 Notes App</h1>
        <h2 class="text-xl text-gray-600">Create your account</h2>
      </div>

      <!-- Register Form -->
      <div class="bg-white py-8 px-6 shadow-lg rounded-lg">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Full Name Field -->
          <Input
            id="fullName"
            v-model="form.fullName"
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            required
          />

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

          <!-- Confirm Password Field -->
          <Input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            required
          />

          <!-- Submit Button -->
          <Button
            type="submit"
            variant="primary"
            full-width
          >
            Create Account
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
            Already have an account?
            <NuxtLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
              Sign in
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
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Display form data without showing password
const formDisplay = computed(() => ({
  fullName: form.value.fullName,
  email: form.value.email,
  password: form.value.password ? '***hidden***' : '',
  confirmPassword: form.value.confirmPassword ? '***hidden***' : ''
}))

// Handle form submission (no backend yet)
const handleSubmit = () => {
  console.log('Register form submitted:', form.value)
  
  // Simple validation
  if (!form.value.fullName || !form.value.email || !form.value.password || !form.value.confirmPassword) {
    alert('Please fill in all fields')
    return
  }
  
  // Check password match
  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match')
    return
  }
  
  // Check password length
  if (form.value.password.length < 6) {
    alert('Password must be at least 6 characters long')
    return
  }
  
  // Show success message for now
  alert(`Registration attempt for: ${form.value.fullName} (${form.value.email})`)
}
</script>