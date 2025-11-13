'use client'

import { useMemo } from 'react'
import { useStartFinDevelopment } from './api/use-start-fin-development'
import { useFiltersStore } from '@/shared/store'
import { ALL_ROADS, ALL_TYPES_OF_WORK } from '@/shared/lib/const'
import { roads } from '@/shared/lib/data'

export function useFilteredFinDevelopment() {
  const { year, road, typeOfWork } = useFiltersStore()

  // Получаем ID дороги из названия
  const railwayId = useMemo(() => {
    if (!road || road === ALL_ROADS) {
      return null
    }
    const roadItem = roads.find((r) => r.name === road)
    return roadItem?.id ?? null
  }, [road])

  // Преобразуем год в число
  const yearNumber = useMemo(() => {
    return year ? parseInt(year, 10) : null
  }, [year])

  // Определяем repairName для запроса
  const repairName = useMemo(() => {
    if (!typeOfWork || typeOfWork === ALL_TYPES_OF_WORK) {
      return ALL_TYPES_OF_WORK
    }
    return typeOfWork
  }, [typeOfWork])

  // Получаем данные с сервера (уже отфильтрованные по году, дороге и типу работ)
  const { data, isLoading } = useStartFinDevelopment(
    yearNumber,
    railwayId,
    repairName
  )

  // Данные уже приходят отфильтрованными, берем первый элемент (должен быть один)
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return null
    return data[0]
  }, [data])

  return {
    data: filteredData,
    isLoading,
  }
}
