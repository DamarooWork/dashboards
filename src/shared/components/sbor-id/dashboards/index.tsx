'use client'
import { Card } from '@/shared/components/card'
import { ChartRoads } from './chart-roads'
import { ChartPerformers } from './chart-performers'
import { useState } from 'react'
import { Switch } from '@/shared/ui'
import { ChartStatus } from './chart-status'

interface Props {
  className?: string
}
type ChartSwitchStatus = 'roads' | 'performers'
export function Dashboards({ className }: Props) {
  const [chartSwitchStatus, setChartSwitchStatus] =
    useState<ChartSwitchStatus>('roads')
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      <Switch
        className="absolute bottom-4 left-4  shadow-lg  border-2 border-foreground  cursor-pointer"
        onCheckedChange={() =>
          setChartSwitchStatus(
            chartSwitchStatus === 'roads' ? 'performers' : 'roads'
          )
        }
      >
        Switch
      </Switch>
      {chartSwitchStatus === 'roads' && (
        <Card className={'flex-1 min-h-0'}>
          <ChartRoads />
        </Card>
      )}
      {chartSwitchStatus === 'performers' && (
        <section className="flex flex-1 gap-8 overflow-hidden min-h-0">
          <Card
            className="flex-1 min-h-0"
            title="Предоставление ИД по Исполнителям"
          >
            <ChartPerformers />
          </Card>
          <Card className={'basis-1/3 min-h-0'} title="Статусы комплектности">
            <ChartStatus />
          </Card>
        </section>
      )}
    </div>
  )
}
