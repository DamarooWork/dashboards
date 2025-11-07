'use client'
import { useEffect, useRef } from 'react'
import { getAuthValue, setAuthValue } from '@/shared/lib/api/auth-value'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const loginAttempted = useRef(false)

  useEffect(() => {
    const performLogin = async () => {
      // Проверяем, был ли уже выполнен login
      if (loginAttempted.current || getAuthValue()) {
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
        }
      } catch (error) {
        console.error('Failed to login:', error)
        loginAttempted.current = false // Разрешаем повторную попытку при ошибке
      }
    }

    performLogin()
  }, [])

  return <>{children}</>
}
