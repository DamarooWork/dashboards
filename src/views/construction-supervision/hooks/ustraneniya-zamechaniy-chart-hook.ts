'use client'

import { faker } from '@faker-js/faker'
import { useRef, useEffect, useState } from 'react'
import { typesOfWork } from '@/shared/lib/data'

export function UstraneniyaZamechaniyChartHook() {
  const chartRef = useRef<any>(null)
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Генерируем данные устраненных змечаний
      const ustraneniyaData = typesOfWork.map(() =>
        faker.number.int({ min: 10, max: 150 })
      )
      // Генерируем данные запланированных
      const plannedData = typesOfWork.map(() =>
        faker.number.int({ min: 1, max: 50 })
      )

     

      const data = {
        labels: typesOfWork.map((type) => type.name),
        datasets: [
          {
            label: 'Устранено',
            data: ustraneniyaData,
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
            data: plannedData,
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
                const plannedValue = plannedData[context.dataIndex]
                return (
                  plannedValue + ustraneniyaData[context.dataIndex]
                )
              },
            },
          }
        
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

