'use client'

import { useMemo } from 'react'
import { Bar, BarChart, XAxis, YAxis, Cell, LabelList } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui'
import { data } from '@/shared/lib/data/sbor-id/v_project_sd_collection_status'
import { useFiltersStore } from '@/shared/store'

interface ChartData {
  name: string
  value: number
  color: string
}

const chartConfig = {
  value: {
    label: 'Статус',
  },
} satisfies ChartConfig

const statusMapping: Record<string, string> = {
  none: 'Нет',
  partial: 'Частично',
  near_completion: 'Почти',
  complete: 'Полный',
  provided: 'Передано',
}

export function ChartStatus() {
  const { v_project_sd_collection_status } = data
  const { road, year, typeOfWork } = useFiltersStore()

  const chartData: ChartData[] = useMemo(() => {
    // Фильтруем данные по выбранным фильтрам
    let filteredData = v_project_sd_collection_status

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

    // Подсчитываем количество для каждого статуса
    const statusCounts = {
      none: 0,
      partial: 0,
      near_completion: 0,
      complete: 0,
      provided: 0,
    }

    filteredData.forEach((item) => {
      const status = item.status as keyof typeof statusCounts
      if (status && statusCounts.hasOwnProperty(status)) {
        statusCounts[status]++
      }
    })

    // Формируем данные для графика
    return [
      { name: 'Нет', value: statusCounts.none, color: 'url(#barGradient)' },
      {
        name: 'Частично',
        value: statusCounts.partial,
        color: 'url(#barGradient)',
      },
      {
        name: 'Почти',
        value: statusCounts.near_completion,
        color: 'url(#barGradient)',
      },
      {
        name: 'Полный',
        value: statusCounts.complete,
        color: 'url(#barGradient)',
      },
      {
        name: 'Передано',
        value: statusCounts.provided,
        color: 'url(#barGradient)',
      },
    ]
  }, [road, year, typeOfWork])

  // Проверка на пустые данные
  const hasData = chartData.some((item) => item.value > 0)

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
      <ChartContainer config={chartConfig} className="h-full w-full">
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
