const AUTH_VALUE_KEY = 'auth_token'

// In-memory кэш для быстрого доступа
let inMemoryAuthValue: string | null = null

export function setAuthValue(value: string | null) {
  inMemoryAuthValue = value
}

export function getAuthValue(): string | null {
  // Сначала проверяем in-memory кэш
  if (inMemoryAuthValue) {
    return inMemoryAuthValue
  }

  return null
}
