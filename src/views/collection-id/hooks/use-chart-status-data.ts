'use client'

import { useMemo } from 'react'
import { useProjectSdCollectionStatus } from './api'
import { useFiltersStore } from '@/shared/store'
import { ALL_ROADS, ALL_TYPES_OF_WORK } from '@/shared/lib/const'
import {
  ProjectSdCollectionStatusItem,
  ChartStatusData,
} from '@/views/collection-id/lib/types'

export function useChartStatusData() {
  const { data, isLoading, error, refetch } = useProjectSdCollectionStatus()
  const { road, year, typeOfWork } = useFiltersStore()

  const chartData: ChartStatusData[] = useMemo(() => {
    // Если данные еще загружаются или произошла ошибка, возвращаем пустой массив
    if (isLoading || error || !data?.contents) {
      return []
    }

    // Фильтруем данные по выбранным фильтрам
    let filteredData: ProjectSdCollectionStatusItem[] = data.contents

    // Фильтр по году
    if (year) {
      filteredData = filteredData.filter(
        (item: ProjectSdCollectionStatusItem) => item.year.toString() === year
      )
    }

    // Фильтр по дороге
    if (road && road !== ALL_ROADS) {
      filteredData = filteredData.filter(
        (item: ProjectSdCollectionStatusItem) => item.railway_name === road
      )
    }

    // Фильтр по типу работы
    if (typeOfWork && typeOfWork !== ALL_TYPES_OF_WORK) {
      filteredData = filteredData.filter(
        (item: ProjectSdCollectionStatusItem) =>
          item.repairtype_name === typeOfWork
      )
    }

    // Подсчитываем количество для каждого статуса
    const statusCounts = {
      none: 0,
      partial: 0,
      near_completion: 0,
      complete: 0,
      provided: 0,
    }

    filteredData.forEach((item: ProjectSdCollectionStatusItem) => {
      const status = item.status as keyof typeof statusCounts
      if (status && statusCounts.hasOwnProperty(status)) {
        statusCounts[status]++
      }
    })

    // Формируем данные для графика
    return [
      { name: 'Нет', value: statusCounts.none, color: 'url(#barGradient)' },
      {
        name: 'Частично',
        value: statusCounts.partial,
        color: 'url(#barGradient)',
      },
      {
        name: 'Почти',
        value: statusCounts.near_completion,
        color: 'url(#barGradient)',
      },
      {
        name: 'Полный',
        value: statusCounts.complete,
        color: 'url(#barGradient)',
      },
      {
        name: 'Передано',
        value: statusCounts.provided,
        color: 'url(#barGradient)',
      },
    ]
  }, [road, year, typeOfWork, data, isLoading, error])

  return {
    chartData,
    isLoading,
    error,
    refetch,
  }
}
