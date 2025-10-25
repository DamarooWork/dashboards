'use client'
import { Card } from '@/shared/components/card'
import { ChartRoads } from './chart-roads'
import { ChartPerformers } from './chart-performers'
import { useState } from 'react'
import { Switch } from '@/shared/ui'

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
          className={
            'mt-6 flex-1  flex items-center justify-center bg-background'
          }
        >
          <ChartRoads />
        </Card>
      )}
      {chartSwitchStatus === 'performers' && (
        <>
        
        <Card
          className={
            'mt-6 flex-1  flex items-center justify-center bg-background'
          }
        >
          <ChartPerformers />
        </Card></>
      )}
    </>
  )
}
