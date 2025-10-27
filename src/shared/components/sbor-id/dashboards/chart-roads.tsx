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
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    y: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 24,
          weight: 'bold' as const,
        },
      },
    },

    y1: {
      type: 'linear' as const,
      position: 'right' as const,
      grid: {
        display: false,
      },

      ticks: {
        font: {
          size: 24,
          weight: 'bold' as const,
        },
        callback: function (value: any) {
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

      const data = {
        labels: roads.map((road) => road.shortName),
        datasets: [
          {
            label: 'План',
            data: roads.map(() => faker.number.int({ min: 1, max: 30 })),
            backgroundColor: createGradient(
              ctx,
              'rgb(34 197 94)',
              'rgb(22 163 74)'
            ),
            order: 1,
            barPercentage: 0.5,
            categoryPercentage: 0.8,
            borderRadius: {
              bottomLeft: 14,
              bottomRight: 14,
            },
            borderSkipped: false,
          },
          {
            label: 'Остаток до плана',
            data: roads.map(() => faker.number.int({ min: 1, max: 30 })),
            backgroundColor: createGradient(
              ctx,
              'rgb(186 230 253)',
              'rgb(125 211 252)'
            ),
            order: 2,
            barPercentage: 0.5,
            categoryPercentage: 0.8,
            borderRadius: {
              topLeft: 14,
              topRight: 14,
             
            },
            borderSkipped: false,
          },
          {
            label: '% выполнения',
            type: 'line' as const,
            data: roads.map(() => faker.number.int({ min: 1, max: 100 })),
            backgroundColor: 'oklch(0.769 0.188 70.08)',
            borderColor: 'oklch(0.769 0.188 70.08)',
            fill: false,
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
    <div className="px-24 w-full h-full">
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
