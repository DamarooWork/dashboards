'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui/chart'

type ColorScheme = 'green' | 'blue'

interface Props {
  className?: string
  initialValue?: number
  weeklyIncrements?: number[]
  colorScheme?: ColorScheme
}

export function Histogram({
  className,
  initialValue = 50,
  weeklyIncrements = [1, 0, 1, 2, 3, 0, 2, 0],
  colorScheme = 'blue',
}: Props) {
  // Генерируем данные для 8 недель с кумулятивным увеличением
  let cumulativeValue = initialValue
  const chartData = weeklyIncrements.map((increment, index) => {
    cumulativeValue += increment
    return {
      week: `нед ${index + 1}`,
      value: cumulativeValue,
    }
  })

  const chartConfig = {
    value: {
      label: 'Значение',
      color: colorScheme === 'green' ? '#10b981' : '#2563eb',
    },
  }

  // Определяем цвета градиента в зависимости от схемы
  const gradientColors = {
    green: {
      start: '#86efac', // темно-зеленый
      end: '#10b981', // светло-зеленый
    },
    blue: {
      start: '#93c5fd', // темно-синий
      end: '#2563eb', // светло-синий
    },
  }

  const colors = gradientColors[colorScheme]

  // Кастомная функция для рендера бара с бордером на последнем элементе
  const renderCustomBar = (props: any) => {
    const { x, y, width, height, index } = props
    const isLast = index === chartData.length - 1
    const radius = 10
    const bottomRadius = 6

    return (
      <g>
        <path
          d={`
            M${x},${y + radius}
            Q${x},${y} ${x + radius},${y}
            L${x + width - radius},${y}
            Q${x + width},${y} ${x + width},${y + radius}
            L${x + width},${y + height - bottomRadius}
            Q${x + width},${y + height} ${x + width - bottomRadius},${
            y + height
          }
            L${x + bottomRadius},${y + height}
            Q${x},${y + height} ${x},${y + height - bottomRadius}
            Z
          `}
          fill={`url(#gradient-${colorScheme})`}
          stroke={isLast ? colorScheme === 'green' ? '#10b981' : '#2563eb' : 'none'}
          strokeWidth={isLast ? 4 : 0}
        />
      </g>
    )
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full  w-full aspect-auto [&_.recharts-cartesian-axis-tick_text]:fill-foreground"
    >
      <BarChart
        data={chartData}
        margin={{ left: -24, right: 0, top: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient
            id={`gradient-${colorScheme}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={colors.start} stopOpacity={1} />
            <stop offset="100%" stopColor={colors.end} stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="week"
          tickMargin={4}
          tick={{
            fontSize: 20,
          }}
        />
        <YAxis
          tickMargin={4}
          tick={{
            fontSize: 24,
          }}
          tickCount={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="value"
          fill={`url(#gradient-${colorScheme})`}
          radius={[10, 10, 6, 6]}
          barSize={36}
          shape={renderCustomBar}
        >
          <LabelList
            dataKey="value"
            position="inside"
            fill={'#ffffff'}
            fontSize={24}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
