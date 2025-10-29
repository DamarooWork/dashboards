'use client'

import { Pie, PieChart, Cell, Label } from 'recharts'
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
            innerRadius={60}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
            label={({ name }) => name}
            labelLine={{
              stroke: 'hsl(var(--foreground))',
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
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <g>
                      {chartData.map((entry, index) => {
                        const RADIAN = Math.PI / 180
                        const total = chartData.reduce(
                          (sum, item) => sum + item.value,
                          0
                        )
                        const startAngle = chartData
                          .slice(0, index)
                          .reduce(
                            (sum, item) => sum + (item.value / total) * 360,
                            0
                          )
                        const angle = (entry.value / total) * 360
                        const midAngle = startAngle + angle / 2 - 90
                        const radius = 80
                        const x =
                          (viewBox.cx || 0) +
                          radius * Math.cos(midAngle * RADIAN)
                        const y =
                          (viewBox.cy || 0) +
                          radius * Math.sin(midAngle * RADIAN)

                        return (
                          <text
                            key={`value-${index}`}
                            x={x}
                            y={y}
                            fill="white"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="font-bold text-xl"
                          >
                            {entry.value}
                          </text>
                        )
                      })}
                    </g>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </section>
  )
}
