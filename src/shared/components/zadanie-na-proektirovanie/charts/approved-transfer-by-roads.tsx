'use client'

import { roads } from '@/shared/lib/data'
import { faker } from '@faker-js/faker'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js'
import datalabels from 'chartjs-plugin-datalabels'
import { Chart } from 'react-chartjs-2'
import { useRef, useEffect, useState } from 'react'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  datalabels
)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false,
    },
    labels: {
      display: false,
    },

    legend: {
      display: false,
    },
    datalabels: {
      display: true, // Включить отображение меток
      color: '#000', // Цвет текста метки
      font: {
        size: 24,
      },
    },
  },
  scales: {
    x: {
      stacked: false,
      grid: {
        display: false,
      },
      ticks: {
        color: 'hsl(var(--foreground))',
        font: {
          size: 20,
        },
      },
    },
    y: {
      stacked: true,

      grid: {
        display: false,
      },
      ticks: {
        color: 'hsl(var(--foreground))',
        font: {
          size: 24,
        },
      },
    },
    y1: {
      type: 'linear' as const,
      position: 'right' as const,
      min: 0,
      max: 120,
      grid: {
        display: false,
      },
      ticks: {
        color: '#000',
        font: {
          size: 24,
        },
        callback: function (value: any) {
          if (value > 100) return ''
          return value + '%'
        },
      },
    },
  },
}

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

export function ApprovedTransferByRoads() {
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
          min: Math.floor(plan * 0.2),
          max: Math.floor(plan * 0.5),
        })
      )
      // Генерируем остаток до плана для утвержденных
      const approvedRemainingData = planData.map(
        (plan, idx) => plan - approvedMainData[idx]
      )

      // Генерируем данные для переданных ЗП (основная часть)
      const transferMainData = planData.map((plan) =>
        faker.number.int({
          min: Math.floor(plan * 0.5),
          max: Math.floor(plan * 0.8),
        })
      )
      // Генерируем остаток до плана для переданных
      const transferRemainingData = planData.map(
        (plan, idx) => plan - transferMainData[idx]
      )

      // Вычисляем среднее значение переданных
      const averageTransfer =
        transferMainData.reduce((sum, val) => sum + val, 0) /
        transferMainData.length

      // Вычисляем процент передачи от плана (верхнего края)
      const transferPercent = roads.map((_, idx) => {
        const plan = planData[idx]
        const transfer = transferMainData[idx]
        return plan > 0 ? Math.min(100, Math.round((transfer / plan) * 100)) : 0
      })

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
              topLeft: 12,
              topRight: 12,
            },
            borderSkipped: false,
            datalabels: {
              color: '#000',
              display: true,
              align: 'right' as const,
              anchor: 'end' as const,
              offset: 3,
              font: {
                size: 24,
              },
              formatter: (_value: any, context: any) => {
                // Сумма Утверждено + Утверждено - остаток = План
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
              topLeft: 12,
              topRight: 12,
            },
            borderSkipped: false,
            datalabels: {
              color: '#000',
              display: false,
            },
          },
          // Среднесетевая (передано) - синяя линия
          {
            label: 'Среднесетевая (передано)',
            type: 'line' as const,
            data: roads.map(() => averageTransfer),
            backgroundColor: '#2563eb',
            borderColor: '#2563eb',
            borderWidth: 3,
            borderDash: [10, 5],
            tension: 0,
            yAxisID: 'y',
            order: 0,
            datalabels: {
              display: false,
            },
            pointRadius: 0,
          },
          // % передачи - оранжевая линия
          {
            label: '% передачи',
            type: 'line' as const,
            data: transferPercent,
            backgroundColor: 'oklch(0.769 0.188 70.08)',
            borderColor: 'oklch(0.769 0.188 70.08)',
            borderWidth: 3,
            tension: 0.4,
            yAxisID: 'y1',
            order: 0,
            datalabels: {
              display: false,
            },
            pointRadius: 4,
          },
        ],
      }

      setChartData(data)
    }
  }, [])

  return (
    <div className="w-full h-full">
      {chartData ? (
        <Chart ref={chartRef} type="bar" options={options} data={chartData} />
      ) : (
        <Chart
          ref={chartRef}
          type="bar"
          options={options}
          data={{
            labels: roads.map((road) => road.shortName),
            datasets: [],
          }}
        />
      )}
    </div>
  )
}
