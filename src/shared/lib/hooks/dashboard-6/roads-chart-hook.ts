'use client'

import { roads } from '@/shared/lib/data'
import { faker } from '@faker-js/faker'
import { useRef, useEffect, useState } from 'react'

export function RoadsChartHook() {
  const chartRef = useRef<any>(null)
  const [chartData, setChartData] = useState<any>(null)
  
  useEffect(() => {
    if (chartRef.current) {
      // Генерируем данные для плана
      const planData = roads.map(() => faker.number.int({ min: 1, max: 30 }))
      const remainderData = roads.map(() =>
        faker.number.int({ min: 1, max: 30 })
      )

      // Вычисляем среднее значение
      const averagePlan =
        planData.reduce((sum, val) => sum + val, 0) / planData.length

      const data = {
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
              color: '#fff', // Белый цвет для меток плана
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
                // Отображаем сумму плана и остатка
                const planValue = planData[context.dataIndex]
                return planValue + value
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

