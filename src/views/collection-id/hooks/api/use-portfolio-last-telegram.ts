'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../../shared/lib/api/axios'

// Функция для выполнения запроса
async function fetchPortfolioLastTelegram() {
  const { data } = await apiClient.post('/json/v2/view/portfolio_last_telegram')
  return data
}

// Хук для использования в компонентах
export function usePortfolioLastTelegram() {
  return useQuery({
    queryKey: ['portfolio_last_telegram'],
    queryFn: fetchPortfolioLastTelegram,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
    placeholderData: keepPreviousData,
  })
}
