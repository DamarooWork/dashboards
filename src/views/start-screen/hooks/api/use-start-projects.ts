'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/lib/api/axios'
import { useAuthReady } from '@/shared/components/providers/auth-provider'
import { StartProjectsItem } from '../../lib/types/start-projects'

interface FetchStartProjectsParams {
  year: number | null
  railwayId: number | null
}

// Функция для выполнения запроса
async function fetchStartProjects({
  year,
  railwayId,
}: FetchStartProjectsParams) {
  if (!year) {
    return []
  }

  // Формируем search query
  const conditions: string[] = [`year = ${year}`]

  // Добавляем railway_id только если он указан (не "Все дороги")
  if (railwayId !== null) {
    conditions.push(`railway_id = ${railwayId}`)
  }

  const searchQuery = conditions.join(' and ')
  const { data } = await apiClient.post<StartProjectsItem[]>(
    '/json/v2/xapi/entity/start_projects',
    {
      search: searchQuery,
    }
  )
  return data
}

// Хук для использования в компонентах
export function useStartProjects(
  year: number | null,
  railwayId: number | null
) {
  const isAuthReady = useAuthReady()

  return useQuery({
    queryKey: ['start_projects', year, railwayId],
    queryFn: () => fetchStartProjects({ year, railwayId }),
    enabled: isAuthReady && year !== null,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
    placeholderData: keepPreviousData,
  })
}
