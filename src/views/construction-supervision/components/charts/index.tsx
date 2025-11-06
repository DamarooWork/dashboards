'use client'
import { Card } from '@/shared/components'
import { useChartSwitchStore } from '@/shared/store'
import { ChartZamechaniya } from './zamechaniya'
import { ChartUstraneniyaZamechaniy } from './ustraneniya-zamechaniy'

export function Charts() {
  const { chartSwitchStatus } = useChartSwitchStore()
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      {chartSwitchStatus === false && (
        <section className="flex flex-1 gap-12 overflow-hidden min-h-0">
          <Card className="flex-1 min-h-0 ">
            <ChartZamechaniya />
          </Card>
        </section>
      )}
      {chartSwitchStatus === true && (
        <Card className={'flex-1 min-h-0'}>
          <ChartUstraneniyaZamechaniy />
        </Card>
      )}
    </div>
  )
}

