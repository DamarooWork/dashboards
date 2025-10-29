'use client'
import { Card } from '@/shared/components'
import { useState } from 'react'
import { Switch } from '@/shared/ui'
import { ChartZamechaniya } from './zamechaniya'
import { ChartUstraneniyaZamechaniy } from './ustraneniya-zamechaniy'

export function Charts() {
  const [chartSwitchStatus, setChartSwitchStatus] = useState<boolean>(true)
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
      {chartSwitchStatus === true && (
        <section className="flex flex-1 gap-12 overflow-hidden min-h-0">
          <Card className="flex-1 min-h-0 ">
            <ChartZamechaniya />
          </Card>
        </section>
      )}
      {chartSwitchStatus === false && (
        <Card className={'flex-1 min-h-0'}>
          <ChartUstraneniyaZamechaniy />
        </Card>
      )}
    </div>
  )
}
