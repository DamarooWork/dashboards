'use client'
import { Card } from '@/shared/components/card'
import { ChartRoads } from './chart-roads'
import { ChartPerformers } from './chart-performers'
import { useState } from 'react'
import { Switch } from '@/shared/ui'
import { ChartStatus } from './chart-status'

export function Charts() {
  const [chartSwitchStatus, setChartSwitchStatus] = useState<boolean>(false)
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      <Switch
        className="absolute bottom-4 left-4"
        onCheckedChange={() =>
          setChartSwitchStatus(chartSwitchStatus === false ? true : false)
        }
      >
        Switch
      </Switch>
      {chartSwitchStatus === false && (
        <Card className={'flex-1 min-h-0'}>
          <ChartRoads />
        </Card>
      )}
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
    </div>
  )
}
