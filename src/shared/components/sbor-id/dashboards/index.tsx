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
    <>
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
        <Card
          className={'mt-6 flex-1 '}
          title="План vs Факт по железным дорогам России"
        >
          <ChartRoads />
        </Card>
      )}
      {chartSwitchStatus === 'performers' && (
        <section className="mt-6 flex gap-4 overflow-hidden">
          <Card className="flex-1" title="Предоставление ИД по Исполнителям">
            <ChartPerformers />
          </Card>
          <Card
            className={'basis-1/3 h-full w-full'}
            title="Статусы комплектности"
          >
            <ChartStatus />
          </Card>
        </section>
      )}
    </>
  )
}
