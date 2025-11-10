'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getAuthValue, setAuthValue } from '@/shared/lib/api/auth-value'

interface AuthContextType {
  isAuthReady: boolean
}

const AuthContext = createContext<AuthContextType>({ isAuthReady: false })

export function useAuthReady() {
  return useContext(AuthContext).isAuthReady
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const loginAttempted = useRef(false)
  // Инициализируем состояние на основе наличия токена
  const [isAuthReady, setIsAuthReady] = useState(() => {
    const hasToken = !!getAuthValue()
    if (hasToken) {
      // Если токен уже есть, сразу помечаем как готов
      return true
    }
    // Если токена нет, начинаем с false и ждем логина
    return false
  })

  useEffect(() => {
    const performLogin = async () => {
      // Если токен уже есть, не нужно логиниться
      if (getAuthValue()) {
        setIsAuthReady(true)
        return
      }

      // Если уже была попытка логина, не повторяем
      if (loginAttempted.current) {
        return
      }

      loginAttempted.current = true

      try {
        // Вызываем API route, который использует переменные окружения на сервере
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to login')
        }

        const data = await response.json()
        // Сохраняем токен на клиенте
        if (data?.token) {
          setAuthValue(data.token)
          setIsAuthReady(true)
        }
      } catch (error) {
        console.error('Failed to login:', error)
        loginAttempted.current = false // Разрешаем повторную попытку при ошибке
      }
    }

    performLogin()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthReady }}>
      {children}
    </AuthContext.Provider>
  )
}
