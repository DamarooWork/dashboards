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

      // Вычисляем среднее значение устраненных
      // const averageEliminated =
      //   eliminatedData.reduce((sum, val) => sum + val, 0) /
      //   eliminatedData.length

      // Вычисляем процент устраненных от общего количества
      // const percentageEliminated = eliminatedData.map((eliminated, index) => {
      //   const remainder = remainingEliminatedData[index]
      //   const totalPlan = eliminated + remainder // Общий план (всего замечаний)
      //   // % устранения = (устранено / общий_план) * 100
      //   return totalPlan > 0 ? Math.round((eliminated / totalPlan) * 100) : 0
      // })

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
          // {
          //   label: 'Среднее устранено',
          //   type: 'line' as const,
          //   data: roads.map(() => averageEliminated),
          //   borderColor: '#2080f0',
          //   backgroundColor: '#2080f0',
          //   borderDash: [10, 5],
          //   tension: 0,
          //   order: 0,
          //   yAxisID: 'y',
          //   datalabels: {
          //     display: false,
          //   },
          //   pointRadius: 0,
          // },
          // {
          //   label: 'Процент устранения',
          //   type: 'line' as const,
          //   data: percentageEliminated,
          //   backgroundColor: 'oklch(0.769 0.188 70.08)',
          //   borderColor: 'oklch(0.769 0.188 70.08)',
          //   tension: 0.5,
          //   order: 0,
          //   yAxisID: 'y1',
          //   datalabels: {
          //     display: false,
          //   },
          //
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

