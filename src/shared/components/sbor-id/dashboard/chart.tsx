import { faker } from '@faker-js/faker'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
      data: labels.map(() => faker.number.int({ min: 0, max: 30 })),
      backgroundColor: 'rgb(34 197 94)',
    },
    {
      label: 'Остаток до плана',
      data: labels.map(() => faker.number.int({ min: 0, max: 30 })),
      backgroundColor: 'rgb(156 163 175)',
    },
  ],
}
export default function Chart() {
  return <Bar options={options} data={data} />
}
