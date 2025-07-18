export interface FormField {
  name: string
  type: string
  label: string
  placeholder: string
  required: boolean
  validation?: {
    minLength?: number
    pattern?: RegExp
    message?: string
  }
}

export const useFormFields = () => {
  const loginFields: FormField[] = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
      validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
      }
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      required: true,
      validation: {
        minLength: 6,
        message: 'Password must be at least 6 characters long'
      }
    }
  ]

  const registerFields: FormField[] = [
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
      validation: {
        minLength: 2,
        message: 'Full name must be at least 2 characters long'
      }
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
      validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
      }
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      required: true,
      validation: {
        minLength: 6,
        message: 'Password must be at least 6 characters long'
      }
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      placeholder: 'Confirm your password',
      required: true,
      validation: {
        minLength: 6,
        message: 'Password confirmation is required'
      }
    }
  ]

  return {
    loginFields,
    registerFields
  }
}