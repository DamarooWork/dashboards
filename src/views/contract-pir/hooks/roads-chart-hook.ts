'use client'

import { roads } from '@/shared/lib/data'
import { faker } from '@faker-js/faker'
import { useRef, useEffect, useState } from 'react'

export function RoadsChartHook() {
  const chartRef = useRef<any>(null)
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current
      const ctx = chart.ctx

      // Генерируем лимит ЦЗ для каждой дороги (максимум для синего стека)
      const limitData = roads.map(() => faker.number.int({ min: 30, max: 50 }))

      // Генерируем основную часть стоимости (синий бар)
      const costMainData = limitData.map((limit) =>
        faker.number.int({
          min: Math.floor(limit * 0.5),
          max: Math.floor(limit * 0.8),
        })
      )

      // Генерируем остаток до лимита ЦЗ (серый над синим)
      const limitRemainingData = limitData.map(
        (limit, idx) => limit - costMainData[idx]
      )

      // Генерируем общее количество объектов для каждой дороги (максимум для зеленого стека)
      const totalObjectsData = roads.map(() =>
        faker.number.int({ min: 10, max: 20 })
      )

      // Генерируем количество объектов, заключенных в ПИР (зеленый бар)
      const objectsCompletedMainData = totalObjectsData.map((total) =>
        faker.number.int({
          min: Math.floor(total * 0.4),
          max: Math.floor(total * 0.7),
        })
      )

      // Генерируем остаток до общего количества объектов (серый над зеленым)
      const objectsRemainingData = totalObjectsData.map(
        (total, idx) => total - objectsCompletedMainData[idx]
      )

      const data = {
        labels: roads.map((road) => road.shortName),
        datasets: [
          // Стоимость (основная часть - синий)
          {
            label: 'Стоимость',
            data: costMainData,
            backgroundColor: '#2080f0',
            stack: 'plan',
            order: 1,
            barPercentage: 1,
            categoryPercentage: 0.9,
            borderRadius: {
              bottomLeft: 0,
              bottomRight: 0,
            },
            borderSkipped: false,
            datalabels: {
              color: '#fff',
            },
          },
          // Лимит УЗ (остаток - серый над синим)
          {
            label: 'Лимит УЗ',
            data: limitRemainingData,
            backgroundColor: '#E5E7EB',
            stack: 'plan',
            order: 1,
            barPercentage: 1,
            categoryPercentage: 0.9,
            borderRadius: {
              topLeft: 0,
              topRight: 0,
            },
            borderSkipped: false,
            datalabels: {
              color: '#000',
              display: true,
              align: 'top' as const,
              anchor: 'end' as const,
              offset: 4,
              font: {
                size: 24,
              },
              formatter: (_value: any, context: any) => {
                return limitData[context.dataIndex]
              },
            },
          },
          // Кол-во объектов закл. ПИР (основная часть - зеленый)
          {
            label: 'Кол-во объектов закл. ПИР',
            data: objectsCompletedMainData,
            backgroundColor: '#10b981',
            stack: 'completed',
            order: 1,
            barPercentage: 1,
            categoryPercentage: 0.9,
            borderRadius: {
              bottomLeft: 0,
              bottomRight: 0,
            },
            borderSkipped: false,
            datalabels: {
              color: '#fff',
            },
          },
          // Кол-во объектов (остаток - серый над зеленым)
          {
            label: 'Кол-во объектов - остаток',
            data: objectsRemainingData,
            backgroundColor: '#E5E7EB',
            stack: 'completed',
            order: 1,
            barPercentage: 1,
            categoryPercentage: 0.9,
            borderRadius: {
              topLeft: 0,
              topRight: 0,
            },
            borderSkipped: false,
            datalabels: {
              color: '#000',
              display: true,
              align: 'top' as const,
              anchor: 'end' as const,
              offset: 4,
              font: {
                size: 24,
              },
              formatter: (_value: any, context: any) => {
                return totalObjectsData[context.dataIndex]
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

