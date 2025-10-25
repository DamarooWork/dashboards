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
      // Здесь настраиваются опции для отображения меток
      display: true, // Включить отображение меток
      color: '#000', // Цвет текста метки
      font: {
        weight: 'bold' as const,
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

export const data = {
  labels: roads.map((road) => road.shortName),
  datasets: [
    {
      label: 'План',
      data: roads.map(() => faker.number.int({ min: 1, max: 30 })),
      backgroundColor: 'rgb(34 197 94)',
      order: 1,
      barPercentage: 0.5,
      categoryPercentage: 0.8,
    },
    {
      label: 'Остаток до плана',
      data: roads.map(() => faker.number.int({ min: 1, max: 30 })),
      backgroundColor: 'rgb(186 230 253)',
      order: 2,
      barPercentage: 0.5,
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
      datalabels: {
        display: false, // Отключаем datalabels для этого датасета
      },
    },
  ],
}

export function ChartRoads() {
  return (
    <div className="px-24 w-full h-full">
      <Chart type="bar" options={options} data={data} />
    </div>
  )
}
