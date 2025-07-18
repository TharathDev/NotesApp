<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      
      <!-- Error Alert -->
      <div v-if="authError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ authError }}</span>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit(onSubmit)">
        <div class="space-y-4">
          <div v-for="field in registerFields" :key="field.name">
            <Input
              :type="field.type"
              :label="field.label"
              :placeholder="field.placeholder"
              :required="field.required"
              :model-value="formData[field.name]"
              :error="getFieldError(field.name)"
              @update:model-value="(value) => handleFieldChange(field.name, value)"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            :disabled="isSubmitting || authLoading"
            class="w-full"
          >
            {{ isSubmitting || authLoading ? 'Creating account...' : 'Create account' }}
          </Button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormFields } from '~/composables/useFormFields'
import { useFormValidation } from '~/composables/useFormValidation'
import { useAuth } from '~/composables/useAuth'
import type { FormData } from '~/composables/useFormValidation'

const { registerFields } = useFormFields()
const { formData, errors, isSubmitting, getFieldError, handleFieldChange, handleSubmit } = useFormValidation(registerFields)
const { register, isLoading: authLoading, error: authError } = useAuth()

// Remove line 76: console.error('Registration error:', err)
// In the onSubmit function:
const onSubmit = async (data: FormData) => {
  try {
    const success = await register({
      username: data.username,
      email: data.email,
      password: data.password
    })
    
    if (success) {
      await navigateTo('/notes')
    }
  } catch (err) {
    // Handle error silently or show user-friendly message
  }
}
</script>