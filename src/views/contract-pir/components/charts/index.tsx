'use client'
import { Card, SmallCards } from '@/shared/components'
import { useChartSwitchStore } from '@/shared/store'
import { ByRoadsChart } from './by-roads'
import { Speedometer, Funnel } from '@/shared/components/charts'
import { Histogram } from '@/shared/components/charts'
import { getPluralForm } from '@/shared/lib/utils'

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
            <Speedometer className="h-1/2" value={30} maxValue={50} />
            <Card className="h-1/2" size="sm">
              <Histogram
                initialValue={30}
                weeklyIncrements={[1, 0, 1, 2, 3, 0, 2, 0]}
              />
            </Card>
          </Card>
          <Card className={'basis-1/2 flex flex-col min-h-0'}>
            <Funnel
              className="h-2/3"
              items={[
                {
                  label: 'Лимит по смете',
                  value: 100,
                  formatValue: (value, percent) => `${percent} млн`,
                },
                {
                  label: 'Лимит ЦЗ',
                  value: 60,
                  formatValue: (value, percent) => `${percent} млн`,
                },
                {
                  label: 'Стоимость',
                  value: 35,
                  formatValue: (value, percent) => `${percent} млн`,
                },
              ]}
            />
            <SmallCards
              title1="Дней до заключения"
              value1="12"
              title2="Крайний срок"
              value2={
                <div className="text-2xl flex flex-col justify-center">
                  <div className="flex flex-col">
                    <p>
                      Приближается: <span className="text-4xl">{12}</span>{' '}
                      {getPluralForm(12, 'объект', 'объекта', 'объектов')}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p>
                      Истекла: <span className="text-4xl">{12}</span>{' '}
                      {getPluralForm(12, 'объект', 'объекта', 'объектов')}
                    </p>
                  </div>
                </div>
              }
            />
          </Card>
        </section>
      )}
    </div>
  )
}

