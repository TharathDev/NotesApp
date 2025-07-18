import { ref, readonly } from "vue";
import type { FormField } from "./useFormFields";

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormData {
  [key: string]: string;
}

export const useFormValidation = (fields: FormField[]) => {
  const formData = ref<FormData>({});
  const errors = ref<ValidationError[]>([]);
  const isSubmitting = ref(false);
  const showErrorModal = ref(false);

  // Initialize form data
  const initializeForm = () => {
    const initialData: FormData = {};
    fields.forEach((field) => {
      initialData[field.name] = "";
    });
    formData.value = initialData;
    errors.value = [];
  };

  // Validate a single field
  const validateField = (fieldName: string, value: string): string | null => {
    const field = fields.find((f) => f.name === fieldName);
    if (!field) return null;

    // Required validation
    if (field.required && !value.trim()) {
      return `${field.label} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!value.trim() && !field.required) {
      return null;
    }

    // Custom validation (runs first if present)
    if (field.validation?.customValidation) {
      const customError = field.validation.customValidation(value);
      if (customError) {
        return customError;
      }
    }

    // Length validation
    if (
      field.validation?.minLength &&
      value.length < field.validation.minLength
    ) {
      return (
        field.validation.message ||
        `${field.label} must be at least ${field.validation.minLength} characters long`
      );
    }

    // Max length validation
    if (
      field.validation?.maxLength &&
      value.length > field.validation.maxLength
    ) {
      return `${field.label} must not exceed ${field.validation.maxLength} characters`;
    }

    // Pattern validation
    if (field.validation?.pattern && !field.validation.pattern.test(value)) {
      return field.validation.message || `${field.label} format is invalid`;
    }

    return null;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: ValidationError[] = [];

    fields.forEach((field) => {
      const error = validateField(field.name, formData.value[field.name] || "");
      if (error) {
        newErrors.push({ field: field.name, message: error });
      }
    });

    // Custom validation for password confirmation
    if (formData.value.password && formData.value.confirmPassword) {
      if (formData.value.password !== formData.value.confirmPassword) {
        newErrors.push({
          field: "confirmPassword",
          message: "Passwords do not match",
        });
      }
    }

    errors.value = newErrors;
    return newErrors.length === 0;
  };

  // Get error for a specific field
  const getFieldError = (fieldName: string): string | undefined => {
    const error = errors.value.find((e) => e.field === fieldName);
    return error?.message;
  };

  // Handle field change with real-time validation
  const handleFieldChange = (fieldName: string, value: string) => {
    formData.value[fieldName] = value;

    // Remove existing error for this field
    errors.value = errors.value.filter((e) => e.field !== fieldName);

    // Validate the field
    const error = validateField(fieldName, value);
    if (error) {
      errors.value.push({ field: fieldName, message: error });
    }

    // Re-validate password confirmation if password changed
    if (fieldName === "password" && formData.value.confirmPassword) {
      errors.value = errors.value.filter((e) => e.field !== "confirmPassword");
      if (value !== formData.value.confirmPassword) {
        errors.value.push({
          field: "confirmPassword",
          message: "Passwords do not match",
        });
      }
    }

    // Re-validate password confirmation
    if (fieldName === "confirmPassword" && formData.value.password) {
      errors.value = errors.value.filter((e) => e.field !== "confirmPassword");
      if (value !== formData.value.password) {
        errors.value.push({
          field: "confirmPassword",
          message: "Passwords do not match",
        });
      }
    }
  };

  const handleSubmit = async (
    submitCallback: (data: FormData) => Promise<void> | void
  ) => {
    if (isSubmitting.value) return;

    isSubmitting.value = true;

    try {
      if (validateForm()) {
        await submitCallback(formData.value);
      } else {
        // Show error modal when validation fails
        showErrorModal.value = true;
      }
    } catch (error) {
      // Handle error silently or show user-friendly message
    } finally {
      isSubmitting.value = false;
    }
  };

  // Close error modal
  const closeErrorModal = () => {
    showErrorModal.value = false;
  };

  // Reset form
  const resetForm = () => {
    initializeForm();
  };

  // Initialize on creation
  initializeForm();

  return {
    formData: readonly(formData),
    errors: readonly(errors),
    isSubmitting: readonly(isSubmitting),
    showErrorModal: readonly(showErrorModal),
    validateField,
    validateForm,
    getFieldError,
    handleFieldChange,
    handleSubmit,
    closeErrorModal,
    resetForm,
  };
};
