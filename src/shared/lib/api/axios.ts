import axios from 'axios'
import { getAuthValue } from './auth-value'
import { getPathWithBase } from '@/shared/lib/const'


// Создаем экземпляр axios с базовой конфигурацией
// Всегда используем прокси через Next.js API route для избежания Mixed Content ошибок
// Прокси работает на сервере Next.js и может безопасно обращаться к HTTP API
const getBaseURL = () => {
 // Всегда используем прокси для клиентских запросов
  // Это решает проблему Mixed Content при загрузке страницы по HTTPS
  return getPathWithBase('/api/proxy')
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
