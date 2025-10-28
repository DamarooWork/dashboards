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
      stacked: true,
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

export function ChartRoads() {
  const chartRef = useRef<any>(null)
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current
      const ctx = chart.ctx

      // Генерируем данные для плана
      const planData = roads.map(() => faker.number.int({ min: 1, max: 30 }))

      // Вычисляем среднее значение
      const averagePlan =
        planData.reduce((sum, val) => sum + val, 0) / planData.length

      const data = {
        labels: roads.map((road) => road.shortName),
        datasets: [
          {
            label: 'План',
            data: planData,
            backgroundColor: createGradient(ctx, '#2080f0', '#2080f0'),
            order: 1,
            barPercentage: 0.3,
            categoryPercentage: 1,
            borderRadius: {
              bottomLeft: 12,
              bottomRight: 12,
            },
            borderSkipped: false,
          },
          {
            label: 'Остаток до плана',
            data: roads.map(() => faker.number.int({ min: 1, max: 30 })),
            backgroundColor: createGradient(ctx, '#E5E7EB', '#E5E7EB'),
            order: 2,
            barPercentage: 0.3,
            categoryPercentage: 1,
            borderRadius: {
              topLeft: 12,
              topRight: 12,
            },
            borderSkipped: false,
          },
          {
            label: 'Среднее (План)',
            type: 'line' as const,
            data: roads.map(() => averagePlan),
            backgroundColor: '#2080f0',
            borderColor: '#2080f0',
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
          {
            label: '% выполнения',
            type: 'line' as const,
            data: roads.map(() => faker.number.int({ min: 1, max: 100 })),
            backgroundColor: 'oklch(0.769 0.188 70.08)',
            borderColor: 'oklch(0.769 0.188 70.08)',
            tension: 0.5,
            yAxisID: 'y1',
            order: 0,
            datalabels: {
              display: false,
            },
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
