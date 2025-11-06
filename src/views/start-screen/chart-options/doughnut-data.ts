import { ChartConfig } from '@/shared/ui'

export interface ChartData {
  name: string
  value: number
  fill: string
  objects: number // Количество объектов
  kilometers: number // Километры
}

export const doughnutChartData: ChartData[] = [
  { name: 'КРН', value: 45, fill: '#1e40af', objects: 12, kilometers: 45.5 },
  { name: 'КРС', value: 30, fill: '#6b21a8', objects: 8, kilometers: 32.2 },
  { name: 'РС', value: 15, fill: '#c2410c', objects: 5, kilometers: 18.7 },
  { name: 'РП', value: 10, fill: '#166534', objects: 3, kilometers: 12.3 },
]

export const doughnutChartConfig = {
  value: {
    label: 'Количество',
  },
  КРН: {
    label: 'КРН',
    color: '#1e40af', // Темный синий
  },
  КРС: {
    label: 'КРС',
    color: '#6b21a8', // Темный фиолетовый
  },
  РС: {
    label: 'РС',
    color: '#c2410c', // Темный терракотовый
  },
  РП: {
    label: 'РП',
    color: '#166534', // Темный зеленый
  },
} satisfies ChartConfig

export const doughnutGradients = [
  {
    id: 'gradient1',
    stops: [
      { offset: '0%', stopColor: '#3b82f6', stopOpacity: 1 },
      { offset: '100%', stopColor: '#1e40af', stopOpacity: 1 },
    ],
  },
  {
    id: 'gradient2',
    stops: [
      { offset: '0%', stopColor: '#9333ea', stopOpacity: 1 },
      { offset: '100%', stopColor: '#6b21a8', stopOpacity: 1 },
    ],
  },
  {
    id: 'gradient3',
    stops: [
      { offset: '0%', stopColor: '#ea580c', stopOpacity: 1 },
      { offset: '100%', stopColor: '#c2410c', stopOpacity: 1 },
    ],
  },
  {
    id: 'gradient4',
    stops: [
      { offset: '0%', stopColor: '#22c55e', stopOpacity: 1 },
      { offset: '100%', stopColor: '#166534', stopOpacity: 1 },
    ],
  },
]
