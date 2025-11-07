'use client'

import { Bar, BarChart, XAxis, YAxis, Cell, LabelList } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui'
import { useChartStatusData } from '@/views/collection-id/hooks'
import { Loading, Error } from '@/shared/components'
import {
  chartStatusConfig,
  ChartStatusData,
} from '@/views/collection-id/lib/types'

export function ChartStatus() {
  const { chartData, isLoading, error, refetch } = useChartStatusData()

  if (isLoading) {
    return <Loading className="w-1/4 h-1/4" />
  }

  if (error) {
    return <Error onRetry={() => refetch()} />
  }

  // Проверка на пустые данные
  const hasData = chartData.some((item: ChartStatusData) => item.value > 0)

  if (!hasData) {
    return (
      <section className={'h-full w-full flex justify-center items-center'}>
        <p className="text-4xl text-muted-foreground">
          Совпадений по фильтрам нет
        </p>
      </section>
    )
  }

  return (
    <section className={'h-full w-full flex justify-center items-center'}>
      <ChartContainer config={chartStatusConfig} className="h-full w-full">
        <BarChart
          data={chartData}
          layout="horizontal"
          margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
              <stop offset="100%" stopColor="#2080f0" stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" type="category" hide />
          <YAxis type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="value" radius={[14, 14, 10, 10]} barSize={40}>
            {chartData.map((entry: ChartStatusData, index: number) => (
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
