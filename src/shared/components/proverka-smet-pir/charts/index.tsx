'use client'
import { Card, SmallCards } from '@/shared/components'
import { Speedometer, Funnel } from '@/shared/components/charts'

import { getPluralForm } from '@/shared/lib/utils'

export function Charts() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      <section className="flex flex-1 gap-12 overflow-hidden min-h-0">
        <Card className="basis-1/2">
          <Speedometer
            className="h-2/3"
            value={19}
            maxValue={34}
          />
          <SmallCards
            title1="Дата получения"
            value1="15.11.2025"
            title2="Крайний срок"
            value2={
              <div className="text-2xl flex flex-col">
                <div className="flex flex-col">
                  <p>
                  Приближается: <span className="text-4xl">{12}</span>{' '}
                    {getPluralForm(12, 'объект', 'объекта', 'объектов')}
                  </p>
                  <p>Истекла: <span className="text-4xl">{12}</span>{' '}
                    {getPluralForm(12, 'объект', 'объекта', 'объектов')}
                  </p>
                </div>
              </div>
            }
          />
        </Card>
        <Card className="basis-1/2">
          <Funnel
            className="h-2/3"
            items={[
              { label: 'Предварительная', value: 100, formatValue: (value, percent) => `${percent} млн` },
              { label: 'Согласованная', value: 60, formatValue: (value, percent) => `${percent} млн` },
              { label: 'Лимит', value: 35, formatValue: (value, percent) => `${percent} млн` },
            ]}
          />
          <SmallCards
            title1="Дата экспертизы"
            value1="15.11.2025"
            title2="Крайний срок"
            value2={
              <div className="text-2xl flex flex-col justify-center">
                <div className="flex flex-col">
                  <p>
                    Приближается: <span className="text-4xl">{12}</span>{' '}
                    {getPluralForm(12, 'объект', 'объекта', 'объектов')}
                  </p>
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
    </div>
  )
}
