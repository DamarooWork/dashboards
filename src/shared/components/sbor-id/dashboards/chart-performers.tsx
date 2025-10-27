'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui'

export const description = 'Предоставление ИД по Исполнителям'

interface ChartData {
  name: string
  value: number
  total: number
  remaining: number
  percent: number
}

const chartData: ChartData[] = [
  { name: 'ПЧ', value: 152, total: 200, remaining: 48, percent: 76 },
  { name: 'РЦДМ', value: 122, total: 200, remaining: 78, percent: 61 },
  { name: 'ДРП', value: 116, total: 200, remaining: 84, percent: 58 },
  { name: 'Д', value: 110, total: 200, remaining: 90, percent: 55 },
  { name: 'ЭЧ', value: 98, total: 200, remaining: 102, percent: 49 },
  { name: 'ШЧ', value: 92, total: 200, remaining: 108, percent: 46 },
  { name: 'НС', value: 82, total: 200, remaining: 118, percent: 41 },
  { name: 'ДТВ', value: 74, total: 200, remaining: 126, percent: 37 },
]

const chartConfig = {
  value: {
    label: 'Значение',
    color: 'var(--chart-2)',
  },
  remaining: {
    label: 'Осталось',
  },
} satisfies ChartConfig

const renderLabel = (props: any) => {
  const { x, y, width, height, index } = props

  if (index === undefined || index === -1) return <text />

  const data = chartData[index]
  // Вычисляем позицию относительно общей ширины графика
  const chartWidth = 200 // максимальное значение total
  const barWidth = (data.total / chartWidth) * Number(width)
  const xPos = Number(x) + barWidth + 10
  const yPos = Number(y) + Number(height) / 2

  return (
    <text
      x={xPos}
      y={yPos}
      fill="var(--foreground)"
      fontSize={24}
      textAnchor="start"
      dominantBaseline="middle"
    >
      {data.value}/{data.total} · {data.percent}%
    </text>
  )
}

export function ChartPerformers() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full px-12 pb-8">
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          left: 40,
          right: 160,
        }}
      >
        <defs>
          <linearGradient id="performerGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2080f0" stopOpacity={1} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
          </linearGradient>
        </defs>
        <XAxis type="number" dataKey="total" hide />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={20}
          axisLine={false}
          tick={{
            fontSize: 24,
            fill: '#fff',
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="value"
          fill="url(#performerGradient)"
          radius={[20, 0, 0, 20]}
          barSize={28}
          stackId="a"
        />
        <Bar
          dataKey="remaining"
          fill="#e5e7eb"
          radius={[0, 20, 20, 0]}
          barSize={28}
          stackId="a"
          label={renderLabel}
        />
      </BarChart>
    </ChartContainer>
  )
}
