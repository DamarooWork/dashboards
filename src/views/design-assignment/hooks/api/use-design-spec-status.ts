'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/lib/api/axios'
import { useAuthReady } from '@/shared/components/providers/auth-provider'

// Функция для выполнения запроса
// Если значения параметров null, API возвращает агрегированные данные по всем значениям
async function fetchDesignSpecStatus() {
  const { data } = await apiClient.post('/json/v2/xapi/entity/design_spec_status')
  return data
}

// Хук для использования в компонентах
export function useDesignSpecStatus() {
  const isAuthReady = useAuthReady()

  return useQuery({
    queryKey: ['design_spec_status'],
    queryFn: () => fetchDesignSpecStatus(),
    enabled: isAuthReady, // Запрос выполняется только после готовности авторизации
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
    placeholderData: keepPreviousData,
  })
}
