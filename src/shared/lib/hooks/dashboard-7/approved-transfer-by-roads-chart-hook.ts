'use client'

import { roads } from '@/shared/lib/data'
import { faker } from '@faker-js/faker'
import { useRef, useEffect, useState } from 'react'

const createGradient = (
  ctx: CanvasRenderingContext2D,
  color1: string,
  color2: string
) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, color1)
  gradient.addColorStop(1, color2)
  return gradient
}

export function ApprovedTransferByRoadsChartHook() {
  const chartRef = useRef<any>(null)
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current
      const ctx = chart.ctx

      // Генерируем план для каждой дороги (одинаковый максимум для обоих баров)
      const planData = roads.map(() => faker.number.int({ min: 10, max: 13 }))

      // Генерируем данные для утвержденных ЗП (основная часть)
      const approvedMainData = planData.map((plan) =>
        faker.number.int({
          min: Math.floor(plan * 0.5),
          max: Math.floor(plan * 0.8),
        })
      )
      // Генерируем остаток до плана для утвержденных
      const approvedRemainingData = planData.map(
        (plan, idx) => plan - approvedMainData[idx]
      )

      // Генерируем данные для переданных ЗП (основная часть)
      const transferMainData = planData.map((plan) =>
        faker.number.int({
          min: Math.floor(plan * 0.2),
          max: Math.floor(plan * 0.5),
        })
      )
      // Генерируем остаток до плана для переданных
      const transferRemainingData = planData.map(
        (plan, idx) => plan - transferMainData[idx]
      )

      // Вычисляем среднее значение переданных
      // const averageTransfer =
      //   transferMainData.reduce((sum, val) => sum + val, 0) /
      //   transferMainData.length

      // Вычисляем процент передачи относительно утвержденного
      // const transferPercent = roads.map((_, idx) => {
      //   const approved = approvedMainData[idx]
      //   const approvedRemainder = approvedRemainingData[idx]
      //   const totalApproved = approved + approvedRemainder // Общее утверждено
      //   const transferred = transferMainData[idx]
      //   // % передачи = (передано / общее_утверждено) * 100
      //   return totalApproved > 0
      //     ? Math.round((transferred / totalApproved) * 100)
      //     : 0
      // })

      const data = {
        labels: roads.map((road) => road.shortName),
        datasets: [
          // Утвержденное ЗП (основная часть - темно-зеленый)
          {
            label: 'Утверждено ЗП',
            data: approvedMainData,
            backgroundColor: createGradient(ctx, '#10b981', '#10b981'),
            stack: 'approved',
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
          // Утвержденное ЗП (остаток - серый)
          {
            label: 'Утверждено — остаток',
            data: approvedRemainingData,
            backgroundColor: createGradient(ctx, '#E5E7EB', '#E5E7EB'),
            stack: 'approved',
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
              align: 'right' as const,
              anchor: 'end' as const,
              offset: 6,
              font: {
                size: 24,
              },
              formatter: (_value: any, context: any) => {
                return planData[context.dataIndex]
              },
            },
          },
          // Переданное ЗП (основная часть - темно-синий)
          {
            label: 'Передано ЗП',
            data: transferMainData,
            backgroundColor: createGradient(ctx, '#2563eb', '#2563eb'),
            stack: 'transferred',
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
          // Переданное ЗП (остаток - серый)
          {
            label: 'Передано — остаток',
            data: transferRemainingData,
            backgroundColor: createGradient(ctx, '#E5E7EB', '#E5E7EB'),
            stack: 'transferred',
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
              display: false,
            },
          },
          // Среднесетевая (передано) - синяя линия
          // {
          //   label: 'Среднесетевая (передано)',
          //   type: 'line' as const,
          //   data: roads.map(() => averageTransfer),
          //   backgroundColor: '#2563eb',
          //   borderColor: '#2563eb',
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
          // % передачи - оранжевая линия
          // {
          //   label: '% передачи',
          //   type: 'line' as const,
          //   data: transferPercent,
          //   backgroundColor: 'oklch(0.769 0.188 70.08)',
          //   borderColor: 'oklch(0.769 0.188 70.08)',
          //   borderWidth: 3,
          //   tension: 0.4,
          //   yAxisID: 'y1',
          //   order: 0,
          //   datalabels: {
          //     display: false,
          //   },
          //   pointRadius: 4,
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

