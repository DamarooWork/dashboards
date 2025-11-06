'use client'

import { roads } from '@/shared/lib/data'
import { faker } from '@faker-js/faker'
import { useRef, useEffect, useState } from 'react'
import { data } from '@/views/collection-id/lib/data/v_portfolio_last_telegram'

export function RoadsChartHook() {
  const chartRef = useRef<any>(null)
  const [chartData, setChartData] = useState<any>(null)
  const { v_portfolio_last_telegram } = data
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
          // {
          //   label: 'Среднее (План)',
          //   type: 'line' as const,
          //   data: roads.map(() => averagePlan),
          //   backgroundColor: '#2080f0',
          //   borderColor: '#2080f0',
          //   borderWidth: 3,
          //   borderDash: [10, 5],
          //   tension: 0,
          //   yAxisID: 'y',
          //   order: 0,
          //   datalabels: {
          //     display: false,
          //   },
          //   pointRadius: 0,
          // },
          // {
          //   label: '% выполнения',
          //   type: 'line' as const,
          //   data: planData.map((completed, index) => {
          //     const remainder = remainderData[index]
          //     const totalPlan = completed + remainder // Общий план
          //     // % выполнения = (выполнено / общий_план) * 100
          //     return totalPlan > 0
          //       ? Math.round((completed / totalPlan) * 100)
          //       : 0
          //   }),
          //   backgroundColor: 'oklch(0.769 0.188 70.08)',
          //   borderColor: 'oklch(0.769 0.188 70.08)',
          //   showLine: false,
          //   tension: 0.5,
          //   yAxisID: 'y1',
          //   order: 0,

          //   datalabels: {
          //     display: false,
          //   },
          //   pointRadius: 8,
          // },
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

