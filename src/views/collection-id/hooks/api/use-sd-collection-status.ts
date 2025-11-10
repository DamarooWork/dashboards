'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../../shared/lib/api/axios'
import { useAuthReady } from '@/shared/components/providers/auth-provider'

// Функция для выполнения запроса
async function fetchSdCollectionStatus() {
  const { data } = await apiClient.post('/json/v2/xapi/entity/sd_collection_status')
  return data
}

// Хук для использования в компонентах
export function useSdCollectionStatus() {
  const isAuthReady = useAuthReady()

  return useQuery({
    queryKey: ['sd_collection_status'],
    queryFn: fetchSdCollectionStatus,
    enabled: isAuthReady, // Запрос выполняется только после готовности авторизации
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
    placeholderData: keepPreviousData,
  })
}

