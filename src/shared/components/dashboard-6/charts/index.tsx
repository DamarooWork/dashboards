'use client'
import { Card } from '@/shared/components/cards/card'
import { useChartSwitchStore } from '@/shared/store'
import { ChartRoads } from './chart-roads'

export function Charts() {
  const { chartSwitchStatus } = useChartSwitchStore()
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      {chartSwitchStatus === false && (
        <Card className={'flex-1 min-h-0'}>
          <ChartRoads />
        </Card>
      )}
      {chartSwitchStatus === true && (
        <section className="flex flex-1 gap-12 overflow-hidden min-h-0">
          <Card className="basis-1/2  pt-8">
            {/* Здесь можно добавить другие графики при необходимости */}
          </Card>
          <Card className={' basis-1/2  pt-8'}>
            {/* Здесь можно добавить другие графики при необходимости */}
          </Card>
        </section>
      )}
    </div>
  )
}
