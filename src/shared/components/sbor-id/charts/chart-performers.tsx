'use client'

import { useMemo } from 'react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui'
import { data } from '@/shared/lib/data/sbor-id/v_sd_collection'
import { useFiltersStore } from '@/shared/store'

export const description = 'Предоставление ИД по Исполнителям'

interface ChartData {
  name: string
  value: number
  total: number
  remaining: number
  percent: number
  percentRemaining: number
}

const chartConfig = {
  value: {
    label: 'Собрано',
    color: 'var(--chart-2)',
  },
  remaining: {
    label: 'Осталось',
  },
} satisfies ChartConfig

export function ChartPerformers() {
  const { v_sd_collection } = data
  const { road, year, typeOfWork } = useFiltersStore()

  const chartData: ChartData[] = useMemo(() => {
    // Фильтруем данные по выбранным фильтрам
    let filteredData = v_sd_collection

    // Фильтр по году
    if (year) {
      filteredData = filteredData.filter(
        (item) => item.year.toString() === year
      )
    }

    // Фильтр по дороге
    if (road && road !== 'Все дороги') {
      filteredData = filteredData.filter((item) => item.railway_name === road)
    }

    // Фильтр по типу работы
    if (typeOfWork && typeOfWork !== 'Все') {
      filteredData = filteredData.filter(
        (item) => item.repairtype_name === typeOfWork
      )
    }

    // Группируем данные по исполнителям (workgroup_name)
    const performersMap = new Map<
      string,
      { collected: number; total: number }
    >()

    filteredData.forEach((item) => {
      const performer = item.workgroup_name
      if (!performersMap.has(performer)) {
        performersMap.set(performer, { collected: 0, total: 0 })
      }
      const stats = performersMap.get(performer)!
      stats.total++
      if (item.is_collected === 1) {
        stats.collected++
      }
    })

    // Преобразуем в массив и сортируем по проценту выполнения
    const chartDataArray: ChartData[] = Array.from(performersMap.entries())
      .map(([name, stats]) => {
        const percent = Math.round((stats.collected / stats.total) * 100)
        return {
          name,
          value: stats.collected,
          total: stats.total,
          remaining: stats.total - stats.collected,
          percent,
          percentRemaining: 100 - percent,
        }
      })
      .sort((a, b) => b.percent - a.percent) // Сортируем по убыванию процента

    return chartDataArray
  }, [road, year, typeOfWork])

  const renderLabel = (props: any) => {
    const { x, y, width, height, index } = props

    if (index === undefined || index === -1 || !chartData[index])
      return <text />

    const item = chartData[index]
    // Позиция метки в конце бара (все бары одинаковой длины)
    const xPos = Number(x) + Number(width) + 10
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
        {item.value}/{item.total} · {item.percent}%
      </text>
    )
  }

  // Проверка на пустые данные
  if (chartData.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-4xl text-muted-foreground">
          Совпадений по фильтрам нет
        </p>
      </div>
    )
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full px-8 pb-8 [&_.recharts-cartesian-axis-tick_text]:fill-foreground"
    >
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
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tick={{
            fontSize: 24,
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="percent"
          fill="url(#performerGradient)"
          radius={[20, 0, 0, 20]}
          barSize={28}
          stackId="a"
        />
        <Bar
          dataKey="percentRemaining"
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
