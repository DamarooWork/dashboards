'use client'

import { Bar, BarChart, XAxis, YAxis, Cell } from 'recharts'
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
    <section className={'h-full w-full'}>
      <ChartContainer config={chartConfig} >
        <BarChart data={chartData} layout="horizontal" margin={{ right: 40, top: 20 }}>
          <XAxis
            dataKey="name"
            type="category"
            tickLine={false}
            axisLine={{
              stroke: '#e5e7eb',
              strokeWidth: 2,
            }}
            tick={{ 
              fontSize: 20,
              fontWeight: 'bold',
            }}
          />
          <YAxis
            type="number"
            domain={[0, 100]}
            tickLine={false}
            axisLine={{
              stroke: '#e5e7eb',
              strokeWidth: 2,
            }}
            tick={{
              fontSize: 14,
            }}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>

      {/* Легенда с процентами */}
      <div className="flex flex-wrap gap-6 justify-center mt-6 mr-10">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-lg font-semibold">
              {item.name}: {item.value}%
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
