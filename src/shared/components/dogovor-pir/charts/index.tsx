'use client'
import { Card } from '@/shared/components/card'
import { useChartSwitchStore } from '@/shared/store'
import { ByRoadsChart } from './by-roads'
import { Speedometer } from '@/shared/components/charts'
import { SmallCards } from '../cards/small-cards'
import { Funnel } from './funnel'

export function Charts() {
  const { chartSwitchStatus } = useChartSwitchStore()
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      {chartSwitchStatus === false && (
        <Card className={'flex-1 min-h-0'}>
          <ByRoadsChart className="w-full h-full" />
        </Card>
      )}

      {chartSwitchStatus === true && (
        <section className="flex flex-1 gap-12 overflow-hidden min-h-0">
          <Card className={'basis-1/2 flex flex-col min-h-0'}>
            <Speedometer className="flex-1 min-h-0" value={30} maxValue={50} />
          </Card>
          <Card className={'basis-1/2 flex flex-col min-h-0'}>
            <Funnel
              className="flex-1 min-h-0"
              limitPosl={100}
              limitUz={60}
              cost={35}
            />
            <SmallCards
              title2="?????????"
              title1="Дней до завершения"
              daysToPlan={12}
            />
          </Card>
        </section>
      )}
    </div>
  )
}
