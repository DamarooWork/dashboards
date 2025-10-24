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
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
)

export const options = {
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

export const data = {
  labels: roads,
  datasets: [
    {
      label: 'План',
      data: roads.map(() => faker.number.int({ min: 1, max: 30 })),
      backgroundColor: 'rgb(34 197 94)',
      order: 1,
      barPercentage: 0.3,
      categoryPercentage: 0.8,
    },
    {
      label: 'Остаток до плана',
      data: roads.map(() => faker.number.int({ min: 1, max: 30 })),
      backgroundColor: 'rgb(186 230 253)',
      order: 2,
      barPercentage: 0.3,
      categoryPercentage: 0.8,
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
    },
  ],
}

export function ChartRoads() {
  return <Chart type="bar" options={options} data={data} />
}
