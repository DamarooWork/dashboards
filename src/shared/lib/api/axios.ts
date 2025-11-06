import axios from 'axios'

import { login } from './auth'
import { getApiToken } from './token'

// Создаем экземпляр axios с базовой конфигурацией
export const apiClient = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Connection: 'keep-alive',
    'User-Agent': 'dashboards-app/1.0',
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'x-auth': process.env.API_TOKEN,
  },
})

// Interceptor для добавления пустого тела запроса по умолчанию
apiClient.interceptors.request.use((config) => {
  const method = (config.method || '').toLowerCase()
  const methodSupportsBody = ['post', 'put', 'patch', 'delete'].includes(method)
  if (methodSupportsBody && typeof config.data === 'undefined') {
    config.data = {}
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
    const fullUrl = rawUrl?.startsWith('http')
      ? rawUrl
      : error.config?.baseURL && rawUrl != null
      ? new URL(rawUrl, error.config.baseURL).toString()
      : rawUrl
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
