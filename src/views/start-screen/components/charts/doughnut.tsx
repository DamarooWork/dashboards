'use client'

import { useRef, useMemo } from 'react'
import { Pie, PieChart, Cell, Sector } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
} from '@/shared/ui'
import { useDoughnutChart } from '../../hooks'
import {
  doughnutChartData,
  doughnutChartConfig,
  doughnutGradients,
} from '../../chart-options/doughnut-data'
import { DoughnutLegend } from './doughnut-legend'
import { renderPieLabel } from './doughnut-utils'
import { useAnimatedTextContent } from '@/shared/lib/hooks'

interface Props {
  className?: string
}

export function Doughnut({ className }: Props) {
  const { selectedType, centerData, handleTypeSelect, handleChartClick } =
    useDoughnutChart()

  const objectsRef = useRef<HTMLDivElement>(null)
  const kilometersRef = useRef<HTMLDivElement>(null)

  useAnimatedTextContent(objectsRef, centerData.objects)
  useAnimatedTextContent(kilometersRef, centerData.kilometers.toFixed(1))

  // Находим индекс выбранного типа для activeIndex
  const activeIndex = useMemo(() => {
    if (selectedType === null) return undefined
    return doughnutChartData.findIndex((item) => item.name === selectedType)
  }, [selectedType])

  // Кастомная форма для активного (выбранного) сектора с увеличенным радиусом
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props

    // Увеличиваем радиус для выбранного сектора
    const expandedOuterRadius = parseFloat(outerRadius) * 1.04
    const expandedInnerRadius = parseFloat(innerRadius)

    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={expandedInnerRadius}
        outerRadius={expandedOuterRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{
          transition: 'all 0.5s ease-in-out',
        }}
      />
    )
  }

  return (
    <section className={className}>
      <div className="relative h-full w-full">
        <ChartContainer config={doughnutChartConfig} className="h-full w-full">
          <PieChart
            onClick={(data, e) => {
              // Обрабатываем клик по пустой области графика (не по сектору)
              // Клики по секторам обрабатываются в Pie.onClick и останавливают всплытие
              if (e && e.nativeEvent) {
                const target = e.nativeEvent.target as HTMLElement
                // Проверяем, что клик не по кнопке легенды
                if (!target.closest('button')) {
                  handleChartClick()
                }
              }
            }}
          >
            <defs>
              {doughnutGradients.map((gradient) => (
                <linearGradient
                  key={gradient.id}
                  id={gradient.id}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  {gradient.stops.map((stop, index) => (
                    <stop
                      key={index}
                      offset={stop.offset}
                      stopColor={stop.stopColor}
                      stopOpacity={stop.stopOpacity}
                    />
                  ))}
                </linearGradient>
              ))}
            </defs>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend
              content={() => (
                <DoughnutLegend
                  items={doughnutChartData}
                  selectedType={selectedType}
                  onTypeSelect={handleTypeSelect}
                />
              )}
            />
            <Pie
              data={doughnutChartData}
              cx="50%"
              cy="50%"
              innerRadius="78%"
              outerRadius="90%"
              paddingAngle={0}
              dataKey="objects"
              labelLine={false}
              nameKey="name"
              style={{ cursor: 'pointer' }}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onClick={(data, index, e) => {
                if (data && data.name) {
                  e?.stopPropagation()
                  handleTypeSelect(data.name)
                }
              }}
            >
              {doughnutChartData.map((entry, index) => {
                const gradientIndex = index + 1
                return (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={`url(#gradient${gradientIndex})`}
                    stroke="none"
                  />
                )
              })}
            </Pie>
          </PieChart>
        </ChartContainer>
        {/* Центральный текст с информацией */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center -translate-y-2/3 text-4xl">
            <div className="flex flex-row items-end justify-center gap-2">
              <p>Объекты:</p>
              <p ref={objectsRef} className="text-5xl">
                {centerData.objects}
              </p>
            </div>
            <div className="flex flex-row items-end justify-center gap-2  text-foreground/60">
              <p className="">Километры:</p>
              <p ref={kilometersRef} className="text-5xl">
                {centerData.kilometers.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
