'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/lib/api/axios'

interface FetchParams {
  p_year: number | null
  p_railway: number | null
}

// Функция для выполнения запроса
// Если значения параметров null, API возвращает агрегированные данные по всем значениям
async function fetchDesignSpecApprReport(params: FetchParams) {
  const body: Record<string, any> = {
    p_year: params.p_year,
    p_railway: params.p_railway,
  }

  const { data } = await apiClient.post('/json/v2/view/design_spec_appr_report')
  return data
}

// Хук для использования в компонентах
export function useDesignSpecApprReport(
  p_year: number | null,
  p_railway: number | null
) {
  return useQuery({
    queryKey: ['design_spec_appr_report', p_year, p_railway],
    queryFn: () => fetchDesignSpecApprReport({ p_year, p_railway }),
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
    placeholderData: keepPreviousData,
  })
}
