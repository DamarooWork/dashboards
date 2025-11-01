'use client'

import { Pie, PieChart, Cell } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
} from '@/shared/ui'
import { useDoughnutChart } from '@/shared/lib/hooks/start-page/doughnut-chart-hook'
import {
  doughnutChartData,
  doughnutChartConfig,
  doughnutGradients,
} from '@/shared/lib/data/start-page/doughnut-data'
import { DoughnutLegend } from './doughnut-legend'
import { renderPieLabel } from './doughnut-utils'

interface Props {
  className?: string
}

export function Doughnut({ className }: Props) {
  const { selectedType, centerData, handleTypeSelect, handleChartClick } =
    useDoughnutChart()

  return (
    <section className={className}>
      <div className="relative h-full w-full">
        <ChartContainer config={doughnutChartConfig} className="h-full w-full">
          <PieChart>
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
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={0}
              dataKey="value"
              label={renderPieLabel}
              labelLine={false}
              nameKey="name"
              style={{ cursor: 'pointer' }}
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
        {/* Кликабельная область поверх графика (не блокирует легенду) */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={(e) => {
            // Проверяем, не кликнули ли мы на кнопку легенды
            const target = e.target as HTMLElement
            if (!target.closest('button')) {
              handleChartClick()
            }
          }}
          style={{ pointerEvents: 'auto' }}
        />
        {/* Центральный текст с информацией */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center -translate-y-10">
            <div className="text-2xl mb-1">Объекты</div>
            <div className="text-4xl mb-3">{centerData.objects}</div>
            <div className="text-xl mb-1">Километры</div>
            <div className="text-4xl">{centerData.kilometers.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
