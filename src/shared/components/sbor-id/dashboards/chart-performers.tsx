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
  percent: number
}

const chartData: ChartData[] = [
  { name: 'ПЧ', value: 152, total: 200, percent: 76 },
  { name: 'РЦДМ', value: 122, total: 200, percent: 61 },
  { name: 'ДРП', value: 116, total: 200, percent: 58 },
  { name: 'Д', value: 110, total: 200, percent: 55 },
  { name: 'ЭЧ', value: 98, total: 200, percent: 49 },
  { name: 'ШЧ', value: 92, total: 200, percent: 46 },
  { name: 'НС', value: 82, total: 200, percent: 41 },
  { name: 'ДТВ', value: 74, total: 200, percent: 37 },
]

const chartConfig = {
  value: {
    label: 'Значение',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

const renderLabel = (props: any) => {
  const { x, y, width, height, value } = props

  const index = chartData.findIndex((d) => d.value === value)
  if (index === -1) return <text />

  const data = chartData[index]
  const xPos = Number(x) + Number(width) + 10
  const yPos = Number(y) + Number(height) / 2

  return (
    <text
      x={xPos}
      y={yPos}
      fill="#666"
      fontSize={20}
      fontWeight="bold"
      textAnchor="start"
      dominantBaseline="middle"
    >
      {data.value}/{data.total} · {data.percent}%
    </text>
  )
}

export function ChartPerformers() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full pl-20 pb-4">
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          left: 30,
          right: 120,
        }}
      >
        <XAxis type="number" dataKey="value" hide />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={20}
          axisLine={false}
          tick={{
            fontSize: 20,
            fontWeight: 'bold',
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="value"
          fill="var(--color-value)"
          radius={20}
          label={renderLabel}
          barSize={20}
        />
      </BarChart>
    </ChartContainer>
  )
}
