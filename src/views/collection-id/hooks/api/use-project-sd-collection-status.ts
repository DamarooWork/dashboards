'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../../shared/lib/api/axios'
import { useAuthReady } from '@/shared/components/providers/auth-provider'

// Функция для выполнения запроса
async function fetchProjectSdCollectionStatus() {
  const { data } = await apiClient.post(
    '/json/v2/view/project_sd_collection_status'
  )
  return data
}

// Хук для использования в компонентах
export function useProjectSdCollectionStatus() {
  const isAuthReady = useAuthReady()

  return useQuery({
    queryKey: ['project_sd_collection_status'],
    queryFn: fetchProjectSdCollectionStatus,
    enabled: isAuthReady, // Запрос выполняется только после готовности авторизации
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
    placeholderData: keepPreviousData,
  })
}
