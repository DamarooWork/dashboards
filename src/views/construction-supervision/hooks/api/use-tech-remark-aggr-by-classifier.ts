'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/lib/api/axios'
import { useAuthReady } from '@/shared/components/providers/auth-provider'

interface FetchParams {
  p_year: number | null
  p_railway: number | null
}

// Функция для выполнения запроса
// Если значения параметров null, API возвращает агрегированные данные по всем значениям
async function fetchTechRemarkAggrByClassifier(params: FetchParams) {
  const body = {
    searchFields: {
      p_year: params.p_year,
      p_railway: params.p_railway,
    },
  }

  const { data } = await apiClient.post(
    '/json/v2/view/tech_remark_aggr_by_classifier',
    body
  )

  return data?.contents || []
}

// Хук для использования в компонентах
export function useTechRemarkAggrByClassifier(
  p_year: number | null,
  p_railway: number | null
) {
  const isAuthReady = useAuthReady()

  return useQuery({
    queryKey: ['tech_remark_aggr_by_classifier', p_year, p_railway],
    queryFn: () => fetchTechRemarkAggrByClassifier({ p_year, p_railway }),
    enabled: isAuthReady, // Запрос выполняется только после готовности авторизации
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
    placeholderData: keepPreviousData,
  })
}

