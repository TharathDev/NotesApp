<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit(onSubmit)">
        <div class="space-y-4">
          <div v-for="field in loginFields" :key="field.name">
            <Input
              :type="field.type"
              :label="field.label"
              :placeholder="field.placeholder"
              :required="field.required"
              :model-value="formData[field.name]"
              :error="getFieldError(field.name)"
              @update:model-value="(value: string) => handleFieldChange(field.name, value)"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            :disabled="isSubmitting"
            class="w-full"
          >
            {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
          </Button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <NuxtLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
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
import type { FormData } from '~/composables/useFormValidation'

const { loginFields } = useFormFields()
const { formData, errors, isSubmitting, getFieldError, handleFieldChange, handleSubmit } = useFormValidation(loginFields)

const onSubmit = async (data: FormData) => {
  console.log('Login form submitted:', data)
  // Here you would typically make an API call to authenticate
  // For now, just simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  alert(`Login attempted with email: ${data.email}`)
}
</script>