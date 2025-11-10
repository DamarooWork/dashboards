'use client'

import { useMemo } from 'react'
import { useDesignSpecStatus } from './api'
import { useFiltersStore } from '@/shared/store'
import { DesignSpecStatusItem } from '../lib/types'

/**
 * Хук для получения и фильтрации данных design_spec_status по году
 * Фильтрация выполняется на фронтенде
 */
export function useFilteredDesignSpecStatus() {
  const { year } = useFiltersStore()
  const { data: apiData, isLoading, isFetching } = useDesignSpecStatus()

  // Преобразуем год из строки в число для сравнения
  const yearNumber = useMemo(() => {
    return year ? parseInt(year, 10) : null
  }, [year])

  // Фильтруем данные по году
  const filteredData = useMemo(() => {
    if (isLoading || !apiData || !Array.isArray(apiData)) {
      return null
    }

    const items: DesignSpecStatusItem[] = apiData

    // Если год не выбран, возвращаем все данные
    if (!yearNumber) {
      return items
    }

    // Фильтруем по году
    return items.filter((item) => item.year === yearNumber)
  }, [apiData, isLoading, yearNumber])

  return {
    data: filteredData,
    isLoading,
    isFetching,
  }
}

