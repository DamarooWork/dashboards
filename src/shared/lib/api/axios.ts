import axios from 'axios'
import { getAuthValue } from './auth-value'

// Создаем экземпляр axios с базовой конфигурацией
// В режиме разработки используем прокси через Next.js API route для работы с cookies
// В production используем прямой URL к API
const getBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    // Используем прокси для разработки (аналог proxy в Vite)
    return '/api/proxy'
  }
  return process.env.NEXT_PUBLIC_API_URL
}

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor для добавления пустого тела запроса по умолчанию и заголовка x-auth
apiClient.interceptors.request.use(async (config) => {
  const method = (config.method || '').toLowerCase()
  const methodSupportsBody = ['post', 'put', 'patch', 'delete'].includes(method)
  if (methodSupportsBody && typeof config.data === 'undefined') {
    config.data = {}
  }

  // Добавляем заголовок x-auth из значения, полученного через login
  const authValue = getAuthValue()
  if (authValue) {
    config.headers['x-auth'] = authValue
  }

  return config
})

// Interceptor для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const code = error.code
    const rawUrl = error.config?.url as string | undefined
    const baseURL = error.config?.baseURL

    // Формируем полный URL для логирования
    let fullUrl: string | undefined = rawUrl
    if (rawUrl) {
      if (rawUrl.startsWith('http')) {
        fullUrl = rawUrl
      } else if (baseURL) {
        if (baseURL.startsWith('http')) {
          // Абсолютный базовый URL
          fullUrl = new URL(rawUrl, baseURL).toString()
        } else {
          // Относительный базовый URL (например, /api/proxy)
          fullUrl = `${baseURL}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`
        }
      }
    }

    console.error('API Error:', {
      message: error.message,
      code,
      status,
      method: error.config?.method,
      url: fullUrl,
      timeout: error.config?.timeout,
    })
    return Promise.reject(error)
  }
)
