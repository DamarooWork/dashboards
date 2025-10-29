'use client'

import { Pie, PieChart, Cell } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui'

interface ChartData {
  name: string
  value: number
  fill: string
}

const chartData: ChartData[] = [
  { name: 'Выполнено', value: 45, fill: '#10b981' },
  { name: 'В процессе', value: 30, fill: '#2080f0' },
  { name: 'Ожидает', value: 15, fill: '#f59e0b' },
  { name: 'Отменено', value: 10, fill: '#ef4444' },
]

const chartConfig = {
  value: {
    label: 'Количество',
  },
} satisfies ChartConfig

interface Props {
  className?: string
}

// Функция для рендеринга и значений, и названий
const renderCustomLabel = (props: any) => {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, name, value } = props

  // Позиция значения в центре сектора
  const radiusValue = (innerRadius + outerRadius) / 2
  const xValue = cx + radiusValue * Math.cos(-midAngle * RADIAN)
  const yValue = cy + radiusValue * Math.sin(-midAngle * RADIAN)

  // Позиция названия снаружи
  const radiusName = outerRadius + 30
  const xName = cx + radiusName * Math.cos(-midAngle * RADIAN)
  const yName = cy + radiusName * Math.sin(-midAngle * RADIAN)

  return (
    <g>
      <text
        x={xValue}
        y={yValue}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-2xl"
      >
        {value}
      </text>
      <text
        x={xName}
        y={yName}
        fill="#000000"
        textAnchor={xName > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-bold text-lg"
      >
        {name}
      </text>
    </g>
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
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={120}
            outerRadius={160}
            paddingAngle={0}
            dataKey="value"
            label={renderCustomLabel}
            labelLine={{
              stroke: '#000000',
              strokeWidth: 1,
            }}
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
