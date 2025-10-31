'use client'

import { Pie, PieChart, Cell } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
} from '@/shared/ui'

interface ChartData {
  name: string
  value: number
  fill: string
}

const chartData: ChartData[] = [
  { name: 'КРН', value: 45, fill: '#3b82f6' },
  { name: 'КРС', value: 30, fill: '#a855f7' },
  { name: 'РС', value: 15, fill: '#f97316' },
  { name: 'РП', value: 10, fill: '#84cc16' },
]

const chartConfig = {
  value: {
    label: 'Количество',
  },
  КРН: {
    label: 'КРН',
    color: '#3b82f6', // Цвет из первого градиента
  },
  КРС: {
    label: 'КРС',
    color: '#a855f7', // Цвет из второго градиента
  },
  РС: {
    label: 'РС',
    color: '#f97316', // Цвет из третьего градиента
  },
  РП: {
    label: 'РП',
    color: '#84cc16', // Цвет из четвертого градиента
  },
} satisfies ChartConfig

interface Props {
  className?: string
}

// Функция для рендеринга только значений
const renderCustomLabel = (props: any) => {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, value } = props

  // Позиция значения в центре сектора
  const radiusValue = (innerRadius + outerRadius) / 2
  const xValue = cx + radiusValue * Math.cos(-midAngle * RADIAN)
  const yValue = cy + radiusValue * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={xValue}
      y={yValue}
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
      className="text-4xl translate-y-1"
    >
      {value}
    </text>
  )
}

// Кастомная легенда с цветами, соответствующими градиентам
const renderCustomLegend = () => {
  const legendItems = [
    { name: 'КРН', color: '#3b82f6' },
    { name: 'КРС', color: '#a855f7' },
    { name: 'РС', color: '#f97316' },
    { name: 'РП', color: '#84cc16' },
  ]

  return (
    <div className="flex items-center justify-center gap-6 pt-6">
      {legendItems.map((item) => {
        const config = chartConfig[item.name as keyof typeof chartConfig]
        return (
          <div
            key={item.name}
            className="flex justify-center items-center gap-2 text-4xl"
          >
            <div
              className="size-6 shrink-0 rounded-full mt-1"
              style={{ backgroundColor: item.color }}
            />
            <span>{config?.label || item.name}</span>
          </div>
        )
      })}
    </div>
  )
}

export function Doughnut({ className }: Props) {
  return (
    <section className={className}>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <PieChart>
          <defs>
            <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity={1} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={1} />
              <stop offset="100%" stopColor="#ea580c" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="gradient4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#84cc16" stopOpacity={1} />
              <stop offset="100%" stopColor="#65a30d" stopOpacity={1} />
            </linearGradient>
          </defs>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <ChartLegend content={renderCustomLegend} />
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            paddingAngle={0}
            dataKey="value"
            label={renderCustomLabel}
            labelLine={false}
            nameKey="name"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#gradient${index + 1})`}
                stroke="none"
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </section>
  )
}
