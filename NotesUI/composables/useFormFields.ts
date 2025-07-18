export interface FormField {
  name: string
  type: string
  label: string
  placeholder: string
  required: boolean
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    message?: string
    customValidation?: (value: string) => string | null
  }
}

export const useFormFields = () => {
  const loginFields: FormField[] = [
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'Enter your username (letters, numbers, underscore only)',
      required: true,
      validation: {
        minLength: 3,
        maxLength: 20,
        pattern: /^[a-zA-Z0-9_]+$/,
        message: 'Username must be 3-20 characters long and contain only letters, numbers, and underscores'
      }
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password (minimum 6 characters)',
      required: true,
      validation: {
        minLength: 6,
        message: 'Password must be at least 6 characters long'
      }
    }
  ]

  const registerFields: FormField[] = [
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'Enter your username (letters, numbers, underscore only)',
      required: true,
      validation: {
        minLength: 3,
        maxLength: 20,
        pattern: /^[a-zA-Z0-9_]+$/,
        message: 'Username must be 3-20 characters long and contain only letters, numbers, and underscores'
      }
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email address',
      required: true,
      validation: {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Please enter a valid email address (e.g., user@example.com)'
      }
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password (minimum 6 characters)',
      required: true,
      validation: {
        minLength: 6,
        customValidation: (value: string) => {
          if (value.length < 6) {
            return 'Password must be at least 6 characters long'
          }
          if (!/(?=.*[a-zA-Z])/.test(value)) {
            return 'Password must contain at least one letter'
          }
          return null
        },
        message: 'Password must be at least 6 characters long and contain at least one letter'
      }
    }
  ]

  return {
    loginFields,
    registerFields
  }
}