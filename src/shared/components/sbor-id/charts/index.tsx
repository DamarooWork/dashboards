'use client'
import { Card } from '@/shared/components/card'
import { ChartRoads } from './chart-roads'
import { ChartPerformers } from './chart-performers'
import { useChartSwitchStore } from '@/shared/store'
import { ChartStatus } from './chart-status'

export function Charts() {
  const { chartSwitchStatus } = useChartSwitchStore()
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      {chartSwitchStatus === true && (
        <section className="flex flex-1 gap-12 overflow-hidden min-h-0">
          <Card className="flex-1 min-h-0" title="Предоставление исполнителями">
            <ChartPerformers />
          </Card>
          <Card className={'basis-1/3 min-h-0'} title="Статус комплектности">
            <ChartStatus />
          </Card>
        </section>
      )}
      {chartSwitchStatus === false && (
        <Card className={'flex-1 min-h-0'}>
          <ChartRoads />
        </Card>
      )}
    </div>
  )
}
