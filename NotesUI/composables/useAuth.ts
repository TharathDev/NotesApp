import axios from 'axios'

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterCredentials {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: number
    username: string
    email: string
  }
}

export interface ApiError {
  message: string
  status?: number
}

export const useAuth = () => {
  const API_BASE_URL = 'http://localhost:5197/api'
  
  // Create axios instance with base configuration
  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 seconds timeout
  })
  
  // Reactive state
  const isAuthenticated = ref(false)
  const user = ref(null)
  const token = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Initialize auth state from localStorage
  const initAuth = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('auth_token')
      const storedUser = localStorage.getItem('auth_user')
      
      if (storedToken && storedUser) {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true
        
        // Set default authorization header for future requests
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
      }
    }
  }

  // Login function
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await apiClient.post('/auth/login', {
        username: credentials.username,
        password: credentials.password
      })

      const authResponse: AuthResponse = response.data
      
      // Store auth data
      token.value = authResponse.token
      user.value = authResponse.user
      isAuthenticated.value = true
      
      // Set authorization header for future requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${authResponse.token}`
      
      // Persist to localStorage
      if (process.client) {
        localStorage.setItem('auth_token', authResponse.token)
        localStorage.setItem('auth_user', JSON.stringify(authResponse.user))
      }
      
      return true
    } catch (err: any) {
      if (err.response?.status === 401) {
        error.value = 'Invalid username or password'
      } else if (err.response?.data?.message) {
        error.value = err.response.data.message
      } else if (err.message) {
        error.value = err.message
      } else {
        error.value = 'Login failed'
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Register function
  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await apiClient.post('/auth/register', {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password
      })

      const authResponse: AuthResponse = response.data
      
      // Store auth data
      token.value = authResponse.token
      user.value = authResponse.user
      isAuthenticated.value = true
      
      // Set authorization header for future requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${authResponse.token}`
      
      // Persist to localStorage
      if (process.client) {
        localStorage.setItem('auth_token', authResponse.token)
        localStorage.setItem('auth_user', JSON.stringify(authResponse.user))
      }
      
      return true
    } catch (err: any) {
      if (err.response?.status === 400) {
        error.value = 'Username or email already exists'
      } else if (err.response?.data?.message) {
        error.value = err.response.data.message
      } else if (err.message) {
        error.value = err.message
      } else {
        error.value = 'Registration failed'
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Logout function
  const logout = () => {
    token.value = ''
    user.value = null
    isAuthenticated.value = false
    
    // Remove authorization header
    delete apiClient.defaults.headers.common['Authorization']
    
    if (process.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
  }

  // Get auth headers for API calls (for external use)
  const getAuthHeaders = () => {
    return {
      'Authorization': `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    }
  }

  // Get configured axios instance for making authenticated requests
  const getApiClient = () => {
    return apiClient
  }

  // Initialize on composable creation
  initAuth()

  return {
    // State
    isAuthenticated: readonly(isAuthenticated),
    user: readonly(user),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Methods
    login,
    register,
    logout,
    getAuthHeaders,
    getApiClient,
    initAuth
  }
}