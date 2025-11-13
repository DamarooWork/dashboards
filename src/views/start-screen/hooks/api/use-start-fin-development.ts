'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/lib/api/axios'
import { useAuthReady } from '@/shared/components/providers/auth-provider'
import { StartFinDevelopmentItem } from '../../lib/types/start-fin-development'

interface FetchStartFinDevelopmentParams {
  year: number | null
  railwayId: number | null
  repairName: string
}

// Функция для выполнения запроса
async function fetchStartFinDevelopment({
  year,
  railwayId,
  repairName,
}: FetchStartFinDevelopmentParams) {
  if (!year) {
    return []
  }

  // Формируем search query
  const conditions: string[] = [`year = ${year}`]

  // Добавляем railway_id только если он указан (не "Все дороги")
  if (railwayId !== null) {
    conditions.push(`railway_id = ${railwayId}`)
  }

  // Добавляем repair_name
  conditions.push(`repair_name = '${repairName}'`)

  const searchQuery = conditions.join(' and ')
  const { data } = await apiClient.post<StartFinDevelopmentItem[]>(
    '/json/v2/xapi/entity/start_fin_development',
    {
      search: searchQuery,
    }
  )
  return data
}

// Хук для использования в компонентах
export function useStartFinDevelopment(
  year: number | null,
  railwayId: number | null,
  repairName: string
) {
  const isAuthReady = useAuthReady()

  return useQuery({
    queryKey: ['start_fin_development', year, railwayId, repairName],
    queryFn: () => fetchStartFinDevelopment({ year, railwayId, repairName }),
    enabled: isAuthReady && year !== null,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
    placeholderData: keepPreviousData,
  })
}
