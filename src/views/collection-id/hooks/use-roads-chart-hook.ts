'use client'

import { useMemo, useRef } from 'react'
import { roads } from '@/shared/lib/data'
import { useSdCollectionStatus } from './api'
import { useFiltersStore } from '@/shared/store'
import { SdCollectionStatusItem } from '@/views/collection-id/lib/types'

export function useRoadsChartHook() {
  const chartRef = useRef<any>(null)
  const { data, isLoading, error, refetch } = useSdCollectionStatus()
  const { road, year, typeOfWork } = useFiltersStore()

  const chartData = useMemo(() => {
    if (isLoading || error || !data?.contents) {
      return null
    }

    // Фильтруем данные по выбранным фильтрам
    let filteredData: SdCollectionStatusItem[] = data.contents

    // Фильтр по году
    if (year) {
      filteredData = filteredData.filter(
        (item: SdCollectionStatusItem) => item.year.toString() === year
      )
    }

    // Группируем данные по дорогам
    const roadStats = new Map<
      string,
      { completed: number; remaining: number }
    >()

    // Инициализируем все дороги с нулевыми значениями
    roads.forEach((road) => {
      roadStats.set(road.name, { completed: 0, remaining: 0 })
    })

    // Подсчитываем статистику по дорогам
    filteredData.forEach((item: SdCollectionStatusItem) => {
      const roadName = item.railway_name
      if (!roadStats.has(roadName)) {
        roadStats.set(roadName, { completed: 0, remaining: 0 })
      }
      const stats = roadStats.get(roadName)!
      if (item.status === 'completed') {
        stats.completed++
      } else {
        stats.remaining++
      }
    })

    // Формируем данные для графика в порядке roads
    const planData: number[] = []
    const remainderData: number[] = []

    roads.forEach((road) => {
      const stats = roadStats.get(road.name) || { completed: 0, remaining: 0 }
      planData.push(stats.completed)
      remainderData.push(stats.remaining)
    })

    return {
      labels: roads.map((road) => road.shortName),
      datasets: [
        {
          label: 'План',
          data: planData,
          backgroundColor: '#2080f0',
          order: 1,
          barPercentage: 0.3,
          categoryPercentage: 1,
          borderRadius: {
            bottomLeft: 12,
            bottomRight: 12,
          },
          borderSkipped: false,
          datalabels: {
            color: '#fff',
            font: {
              size: 24,
            },
          },
        },
        {
          label: 'Остаток до плана',
          data: remainderData,
          backgroundColor: '#E5E7EB',
          order: 2,
          barPercentage: 0.3,
          categoryPercentage: 1,
          borderRadius: {
            topLeft: 12,
            topRight: 12,
          },
          borderSkipped: false,
          datalabels: {
            color: '#000',
            font: {
              size: 24,
            },
            anchor: 'end' as const,
            align: 'top' as const,
            offset: 4,
            formatter: function (value: number, context: any) {
              const planValue = planData[context.dataIndex]
              return planValue + value
            },
          },
        },
      ],
    }
  }, [road, year, typeOfWork, data, isLoading, error])

  return {
    chartRef,
    chartData,
    isLoading,
    error,
    refetch,
  }
}
