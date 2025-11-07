import { ChartConfig } from '@/shared/ui'

export const chartPerformersConfig = {
  value: {
    label: 'Собрано',
    color: 'var(--chart-2)',
  },
  remaining: {
    label: 'Осталось',
  },
} satisfies ChartConfig

export const chartStatusConfig = {
  value: {
    label: 'Статус',
  },
} satisfies ChartConfig
