const AUTH_VALUE_KEY = 'auth_token'

// In-memory кэш для быстрого доступа
let inMemoryAuthValue: string | null = null

// Инициализация из localStorage при загрузке модуля (только на клиенте)
if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem(AUTH_VALUE_KEY)
    if (stored) {
      inMemoryAuthValue = stored
    }
  } catch (error) {
    console.warn('Failed to read auth value from localStorage:', error)
  }
}

export function setAuthValue(value: string | null) {
  inMemoryAuthValue = value
  
  // Сохраняем в localStorage для персистентности (только на клиенте)
  if (typeof window !== 'undefined') {
    try {
      if (value) {
        localStorage.setItem(AUTH_VALUE_KEY, value)
      } else {
        localStorage.removeItem(AUTH_VALUE_KEY)
      }
    } catch (error) {
      console.warn('Failed to save auth value to localStorage:', error)
    }
  }
}

export function getAuthValue(): string | null {
  // Сначала проверяем in-memory кэш
  if (inMemoryAuthValue) {
    return inMemoryAuthValue
  }
  
  // Если в памяти нет, пытаемся загрузить из localStorage (только на клиенте)
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(AUTH_VALUE_KEY)
      if (stored) {
        inMemoryAuthValue = stored
        return stored
      }
    } catch (error) {
      console.warn('Failed to read auth value from localStorage:', error)
    }
  }
  
  return null
}
