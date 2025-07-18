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
      name: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'Enter your username',
      required: true,
      validation: {
        minLength: 3,
        message: 'Username must be at least 3 characters long'
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
      name: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'Enter your username',
      required: true,
      validation: {
        minLength: 3,
        message: 'Username must be at least 3 characters long'
      }
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
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

  return {
    loginFields,
    registerFields
  }
}