'use client'

import { Button } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { doughnutChartConfig } from '@/shared/lib/data/start-page/doughnut-data'
import type { ChartData } from '@/shared/lib/data/start-page/doughnut-data'

interface DoughnutLegendProps {
  items: ChartData[]
  selectedType: string | null
  onTypeSelect: (type: string | null) => void
}

export function DoughnutLegend({
  items,
  selectedType,
  onTypeSelect,
}: DoughnutLegendProps) {
  return (
    <div className="flex items-center justify-between gap-2 ">
      {items.map((item) => {
        const config =
          doughnutChartConfig[item.name as keyof typeof doughnutChartConfig]
        const isSelected = selectedType === item.name
        const isAllSelected = selectedType === null

        return (
          <Button
            key={item.name}
            onClick={(e) => {
              e.stopPropagation()
              onTypeSelect(item.name)
            }}
            variant="outline"
            className={cn(
              'flex flex-col justify-center items-center gap-.5 text-xl h-auto px-2 py-1.5 relative z-10 shrink-0 transition-all active:scale-90 will-change-transform',
              isSelected || isAllSelected
                ? 'opacity-100'
                : 'opacity-40 hover:opacity-90'
            )}
            style={{
              borderColor: item.fill,
            }}
          >
            <div className="flex items-center gap-1.5">
              <div
                className="size-5 shrink-0 rounded-full mt-1"
                style={{ backgroundColor: item.fill }}
              />
              <span className="whitespace-nowrap text-3xl">
                {config?.label || item.name}
              </span>
            </div>
            <span className="text-2xl whitespace-nowrap">
              {item.objects}об
            </span>
            <span className="text-2xl whitespace-nowrap">
              {item.kilometers}км
            </span> 
          </Button>
        )
      })}
    </div>
  )
}
