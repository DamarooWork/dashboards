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
  { name: 'Нет', value: 12, color: '#ef4444' },
  { name: 'Частично', value: 18, color: '#f97316' },
  { name: 'Почти', value: 22, color: '#eab308' },
  { name: 'Полный', value: 40, color: '#22c55e' },
  { name: 'Передано', value: 8, color: '#3b82f6' },
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
          margin={{ top: 20, right: 40, bottom: 40, left: 20 }}
        >
          <XAxis dataKey="name" type="category" hide />
          <YAxis type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={50}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList
              dataKey="name"
              position="bottom"
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                fill: 'hsl(var(--foreground))',
              }}
              offset={10}
            />
            <LabelList
              dataKey="value"
              position="inside"
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                fill: '#ffffff',
              }}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </section>
  )
}
