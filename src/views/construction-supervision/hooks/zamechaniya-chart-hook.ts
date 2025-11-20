'use client'

import { roads } from '@/shared/lib/data'
import { useRef, useEffect, useState, useMemo } from 'react'
import { useBuildControlData } from './use-build-control-data'

export function ZamechaniyaChartHook() {
  const chartRef = useRef<any>(null)
  const [chartData, setChartData] = useState<any>(null)
  const { data, isLoading, isFetching, error } = useBuildControlData()

  // Преобразуем данные API в формат для графика
  const processedData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return null
    }

    // Создаем мапу для быстрого доступа к данным по ID дороги
    const dataByRailway = new Map<number, any>()

    data.forEach((item: any) => {
      const railwayId = Number(item.railway_id || 0)
      if (railwayId) {
        dataByRailway.set(railwayId, item)
      }
    })

    // Формируем массивы данных для каждой дороги
    const eliminatedData: number[] = []
    const remainingEliminatedData: number[] = []
    const labels: string[] = []

    roads.forEach((road) => {
      const item = dataByRailway.get(road.id)
      if (item) {
        // Используем точные названия полей из API
        const vijavlenno = Number(item.remark_quantity || 0)
        const ustraneno = Number(item.conf_remark_quantity || 0)

        eliminatedData.push(ustraneno)
        // Остаток = выявлено - устранено
        remainingEliminatedData.push(Math.max(0, vijavlenno - ustraneno))
        // Используем сокращенное название из API
        labels.push(item.railway_sn || road.shortName)
      } else {
        // Если данных для дороги нет, ставим 0
        eliminatedData.push(0)
        remainingEliminatedData.push(0)
        labels.push(road.shortName)
      }
    })

    return {
      labels,
      eliminatedData,
      remainingEliminatedData,
    }
  }, [data])

  useEffect(() => {
    if (chartRef.current && processedData) {
      const data = {
        labels: processedData.labels,
        datasets: [
          {
            label: 'Устранено',
            data: processedData.eliminatedData,
            backgroundColor: '#2080f0',
            order: 1,
            barPercentage: 0.45,
            categoryPercentage: 1,
            borderRadius: {
              bottomLeft: 12,
              bottomRight: 12,
            },
            borderSkipped: false,
            datalabels: {
              color: '#fff', // Белый цвет для меток плана
              font: {
                size: 24,
              },
            },
          },
          {
            label: 'Остаток устранения',
            data: processedData.remainingEliminatedData,
            backgroundColor: '#E5E7EB',
            order: 2,
            barPercentage: 0.45,
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
              formatter: function (value: number, context: any) {
                // Отображаем количество выявленных (устранено + остаток)
                const eliminatedValue =
                  processedData.eliminatedData[context.dataIndex]
                return (
                  eliminatedValue +
                  processedData.remainingEliminatedData[context.dataIndex]
                )
              },
            },
          },
        ],
      }

      setChartData(data)
    } else if (chartRef.current && isLoading) {
      // Показываем пустой график во время загрузки
      setChartData({
        labels: roads.map((road) => road.shortName),
        datasets: [],
      })
    }
  }, [processedData, isLoading])

  return {
    chartRef,
    chartData,
    isLoading,
    isFetching,
    error,
  }
}
