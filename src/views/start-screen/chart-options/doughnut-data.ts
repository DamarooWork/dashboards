import { ChartConfig } from '@/shared/ui'

export interface ChartData {
  name: string
  value: number
  fill: string
  objects: number // Количество объектов
  kilometers: number // Километры
}

// Порядок отображения видов ремонта
export const repairOrder = ['КРН', 'КРС', 'РС', 'РП'] as const

// Маппинг названий видов ремонта к цветам (используется для легенды)
export const repairNameToColor: Record<string, string> = {
  РП: '#ff994d', // rgb(255,153,77)
  РС: '#505372', // rgb(80,83,114)
  КРС: '#b6d634', // rgb(182,214,52)
  КРН: '#5070dd', // rgb(80,112,221)
}

export const doughnutChartConfig = {
  value: {
    label: 'Количество',
  },

  РП: {
    label: 'РП',
    color: repairNameToColor.РП,
  },
  РС: {
    label: 'РС',
    color: repairNameToColor.РС,
  },
  КРС: {
    label: 'КРС',
    color: repairNameToColor.КРС,
  },
  КРН: {
    label: 'КРН',
    color: repairNameToColor.КРН,
  },
} satisfies ChartConfig
