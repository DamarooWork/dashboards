'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { useTechRemarkData } from './use-tech-remark-data'

export function UstraneniyaZamechaniyChartHook() {
  const chartRef = useRef<any>(null)
  const [chartData, setChartData] = useState<any>(null)
  const { data, isLoading, isFetching, error } = useTechRemarkData()

  // Преобразуем данные API в формат для графика
  const processedData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return null
    }

    // Формируем массивы данных для каждой категории работ из API
    const eliminatedData: number[] = []
    const plannedData: number[] = []
    const labels: string[] = []

    data.forEach((item: any) => {
      const categoryName = item.category_name
      if (categoryName) {
        // Используем точные названия полей из API
        const vijavlenno = Number(item.remark_quantity || 0)
        const ustraneno = Number(item.conf_remark_quantity || 0)

        eliminatedData.push(ustraneno)
        // Запланировано = выявлено - устранено
        plannedData.push(Math.max(0, vijavlenno - ustraneno))
        labels.push(categoryName)
      }
    })

    return {
      labels,
      eliminatedData,
      plannedData,
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
            label: 'Запланировано',
            data: processedData.plannedData,
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
                // Отображаем количество выявленных (устранено + запланировано)
                const eliminatedValue =
                  processedData.eliminatedData[context.dataIndex]
                return (
                  eliminatedValue + processedData.plannedData[context.dataIndex]
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
        labels: [],
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
