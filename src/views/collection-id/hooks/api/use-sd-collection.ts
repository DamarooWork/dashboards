'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/lib/api/axios'

// Функция для выполнения запроса
async function fetchSdCollection() {
  const { data } = await apiClient.post('/json/v2/view/sd_collection')
  return data
}

// Хук для использования в компонентах
export function useSdCollection() {
  return useQuery({
    queryKey: ['sd_collection'],
    queryFn: fetchSdCollection,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
    placeholderData: keepPreviousData,
  })
}
