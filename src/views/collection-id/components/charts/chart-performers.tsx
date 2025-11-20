'use client'

import { useMemo } from 'react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui'
import { useFiltersStore } from '@/shared/store'
import {
  ALL_ROADS,
  ALL_TYPES_OF_WORK,
  REQUIRED_PERFORMERS,
} from '@/shared/lib/const'
import { useSdCollection } from '@/views/collection-id/hooks'
import { Loading, Error } from '@/shared/components'
import {
  SdCollectionItem,
  ChartPerformersData,
  chartPerformersConfig,
} from '@/views/collection-id/lib/types'

export function ChartPerformers() {
  const { data, isLoading, error, refetch } = useSdCollection()
  const { road, year, typeOfWork } = useFiltersStore()

  const chartData: ChartPerformersData[] = useMemo(() => {
    // Если данные еще загружаются или произошла ошибка, возвращаем пустой массив
    if (isLoading || error || !data) {
      return []
    }

    // Фильтруем данные по выбранным фильтрам
    let filteredData: SdCollectionItem[] = Array.isArray(data) ? data : []

    // Фильтр по году
    if (year) {
      filteredData = filteredData.filter(
        (item: SdCollectionItem) => item.year.toString() === year
      )
    }

    // Фильтр по дороге
    if (road && road !== ALL_ROADS) {
      filteredData = filteredData.filter(
        (item: SdCollectionItem) => item.railway_name === road
      )
    }

    // Фильтр по типу работы
    if (typeOfWork && typeOfWork !== ALL_TYPES_OF_WORK) {
      filteredData = filteredData.filter(
        (item: SdCollectionItem) => item.repairtype_name === typeOfWork
      )
    }

    // Инициализируем Map с обязательными исполнителями
    const performersMap = new Map<
      string,
      { collected: number; total: number }
    >()

    // Добавляем обязательных исполнителей с начальными значениями 0/0
    REQUIRED_PERFORMERS.forEach((performer) => {
      performersMap.set(performer, { collected: 0, total: 0 })
    })

    // Группируем данные по исполнителям (workgroup_name)
    filteredData.forEach((item: SdCollectionItem) => {
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

    // Преобразуем в массив
    const chartDataArray: ChartPerformersData[] = Array.from(
      performersMap.entries()
    ).map(([name, stats]) => {
      // Обработка случая 0/0
      const percent =
        stats.total === 0
          ? 0
          : Math.round((stats.collected / stats.total) * 100)
      return {
        name,
        value: stats.collected,
        total: stats.total,
        remaining: stats.total - stats.collected,
        percent,
        percentRemaining: 100 - percent,
      }
    })

    return chartDataArray
  }, [road, year, typeOfWork, data, isLoading, error])

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

  if (isLoading) {
    return <Loading className="w-1/4 h-1/4"/>
  }

  if (error) {
    return <Error onRetry={() => refetch()} />
  }

  return (
    <ChartContainer
      config={chartPerformersConfig}
      className="h-full w-full pb-8 [&_.recharts-cartesian-axis-tick_text]:fill-foreground"
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          left: 40,
          right: 180,
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
