<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg w-full max-w-md">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              Validation Errors
            </h3>
            <p class="text-sm text-gray-600">Please fix the following issues</p>
          </div>
        </div>
      </div>

      <div class="p-6">
        <ul class="space-y-2">
          <li
            v-for="error in errors"
            :key="error.field"
            class="flex items-start space-x-2"
          >
            <div
              class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"
            ></div>
            <span class="text-gray-700">{{ error.message }}</span>
          </li>
        </ul>
      </div>

      <div class="flex justify-end p-6 border-t border-gray-200">
        <button
          @click="$emit('close')"
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ValidationError } from "~/composables/useFormValidation";

interface Props {
  show: boolean;
  errors: ValidationError[];
}

defineProps<Props>();
defineEmits<{
  close: [];
}>();
</script>
