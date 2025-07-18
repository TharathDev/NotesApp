<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
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
            :disabled="isSubmitting"
            class="w-full"
          >
            {{ isSubmitting ? 'Creating account...' : 'Create account' }}
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
import type { FormData } from '~/composables/useFormValidation'

const { registerFields } = useFormFields()
const { formData, errors, isSubmitting, getFieldError, handleFieldChange, handleSubmit } = useFormValidation(registerFields)

const onSubmit = async (data: FormData) => {
  console.log('Register form submitted:', data)
  // Here you would typically make an API call to register
  // For now, just simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  alert(`Registration attempted with email: ${data.email} and name: ${data.fullName}`)
}
</script>