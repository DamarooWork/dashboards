'use client'

import { Bar, BarChart, XAxis, YAxis, Cell, LabelList } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui'

interface ChartData {
  name: string
  value: number
  color: string
}

const chartData: ChartData[] = [
  { name: 'Нет', value: 12, color: '#2080f0' },
  { name: 'Частично', value: 18, color: '#2080f0' },
  { name: 'Почти', value: 22, color: '#2080f0' },
  { name: 'Полный', value: 40, color: '#2080f0' },
  { name: 'Передано', value: 8, color: '#2080f0' },
]

const chartConfig = {
  value: {
    label: 'Статус',
  },
} satisfies ChartConfig

interface Props {
  className?: string
}

export function ChartStatus({ className }: Props) {
  return (
    <section className={'h-full w-full flex justify-center items-center'}>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <BarChart
          data={chartData}
          layout="horizontal"
          margin={{ top: 30, right: 40, bottom: 30, left: 40 }}
        >
          <XAxis dataKey="name" type="category" hide />
          <YAxis type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="value" radius={[14, 14, 10, 10]} barSize={40}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList
              dataKey="name"
              position="bottom"
              style={{
                fontSize: '22px',
                fill: 'hsl(var(--foreground))',
              }}
              offset={10}
            />
            <LabelList
              dataKey="value"
              position="top"
              style={{
                fontSize: '24px',
                fill: 'hsl(var(--foreground))',
              }}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </section>
  )
}
