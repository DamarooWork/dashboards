'use client'

import { useMemo } from 'react'
import { useBuildControlAggr } from './api'
import { useFiltersStore } from '@/shared/store'
import { ALL_ROADS } from '@/shared/lib/const'
import { roads } from '@/shared/lib/data'

export function useBuildControlData() {
  const { road, year } = useFiltersStore()

  // Получаем ID дороги из названия
  // Если дорога не выбрана или "Все дороги", передаем null для агрегированных данных
  const railwayId = useMemo(() => {
    if (!road || road === ALL_ROADS) {
      return null
    }
    const roadItem = roads.find((r) => r.name === road)
    return roadItem?.id ?? null
  }, [road])

  // Преобразуем год в число
  // Если год не выбран, передаем null для агрегированных данных
  const yearNumber = useMemo(() => {
    return year ? parseInt(year, 10) : null
  }, [year])

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useBuildControlAggr(yearNumber, railwayId)

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  }
}

