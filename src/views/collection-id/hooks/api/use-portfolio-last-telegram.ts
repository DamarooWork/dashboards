'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../../shared/lib/api/axios'
import { useAuthReady } from '@/shared/components/providers/auth-provider'

// Функция для выполнения запроса
async function fetchPortfolioLastTelegram() {
  const { data } = await apiClient.post('/json/v2/view/portfolio_last_telegram')
  return data
}

// Хук для использования в компонентах
export function usePortfolioLastTelegram() {
  const isAuthReady = useAuthReady()

  return useQuery({
    queryKey: ['portfolio_last_telegram'],
    queryFn: fetchPortfolioLastTelegram,
    enabled: isAuthReady, // Запрос выполняется только после готовности авторизации
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
    placeholderData: keepPreviousData,
  })
}
