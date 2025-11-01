import { Card, SmallCards } from '@/shared/components'
import { Speedometer } from '@/shared/components/charts'
import { Funnel } from '../../charts/funnel'
import { getPluralForm } from '@/shared/lib/utils'

export function Charts() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      <section className="flex flex-1 gap-12 overflow-hidden min-h-0">
        <Card className="basis-1/2">
          <Speedometer
            className="flex-1 min-h-0"
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
            className="flex-1 min-h-0"
            items={[
              { label: 'Предварительная', value: 100 },
              { label: 'Согласованная', value: 60 },
              { label: 'Лимит', value: 35 },
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
