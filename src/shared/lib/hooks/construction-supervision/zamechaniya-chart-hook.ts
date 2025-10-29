'use client'

import { roads } from '@/shared/lib/data'
import { faker } from '@faker-js/faker'
import { useRef, useEffect, useState } from 'react'

export function ZamechaniyaChartHook() {
  const chartRef = useRef<any>(null)
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Генерируем данные
      const eliminatedData = roads.map(() =>
        faker.number.int({ min: 10, max: 150 })
      )
      const remainingEliminatedData = roads.map(() =>
        faker.number.int({ min: 1, max: 50 })
      )

      const data = {
        labels: roads.map((road) => road.shortName),
        datasets: [
          {
            label: 'Устранено',
            data: eliminatedData,
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
            data: remainingEliminatedData,
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
                // Отображаем количество выявленных
                const eliminatedValue = eliminatedData[context.dataIndex]
                return (
                  eliminatedValue + remainingEliminatedData[context.dataIndex]
                )
              },
            },
          },
        ],
      }

      setChartData(data)
    }
  }, [])
  return {
    chartRef,
    chartData,
  }
}
