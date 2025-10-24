import { faker } from '@faker-js/faker'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LineController,
  PointElement,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  plugins: {
    title: {
      display: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
    y1: {
      type: 'linear' as const,
      position: 'right' as const,
    },
  },
}

const labels = [
  'Октябрьская',
  'Калининградская',
  'Московская',
  'Горьковская',
  'Северная',
  'Северо-Кавказская',
  'Юго-Восточная',
  'Приволжская',
  'Куйбышевская',
  'Свердловская',
  'Южно-Уральская',
  'Западно-Сибирская',
  'Красноярская',
  'Восточно-Сибирская',
  'Забайкальская',
  'Дальневосточная',
]

export const data = {
  labels,
  datasets: [
    {
      label: 'План',
      data: labels.map(() => faker.number.int({ min: 1, max: 30 })),
      backgroundColor: 'rgb(34 197 94)',
      order: 1,
    },
    {
      label: 'Остаток до плана',
      data: labels.map(() => faker.number.int({ min: 1, max: 30 })),
      backgroundColor: 'rgb(156 163 175)',
      order: 2,
    },
    {
      label: '% выполнения',
      type: 'line' as const,
      data: labels.map(() => faker.number.int({ min: 1, max: 100 })),
      backgroundColor: 'oklch(0.769 0.188 70.08)',
      borderColor: 'oklch(0.769 0.188 70.08)',

      fill: false,
      tension: 0.1,
      yAxisID: 'y1',
      order: 0,
    },
  ],
}
export default function ChartComponent() {
  return <Chart type="bar" options={options} data={data} />
}
