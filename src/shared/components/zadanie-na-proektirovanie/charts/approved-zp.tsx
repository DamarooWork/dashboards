import { Speedometer, Histogram } from '@/shared/components/charts'
import { Card, SmallCards } from '@/shared/components'

import { getPluralForm } from '@/shared/lib/utils'

export function ApprovedZP() {
  const lastDate = 59
  const overdue = 1

  return (
    <section className="flex flex-col gap-4 h-full flex-1">
      <Speedometer className="basis-1/2" value={121} maxValue={150} />
      <Card className="basis-1/2" size="sm">
        <Histogram
          initialValue={50}
          weeklyIncrements={[1, 0, 1, 2, 3, 0, 2, 0]}
        />
      </Card>
      <SmallCards
        title1="Дней до плановой даты"
        title2="Дата утверждения"
        value1={12}
        value2={
          <div className="text-2xl flex flex-col justify-center">
            <div className="flex flex-col">
              <p>
                Приближается: <span className="text-4xl">{lastDate}</span>{' '}
                {getPluralForm(lastDate, 'объект', 'объекта', 'объектов')}
              </p>
              <p>
                Истекла: <span className="text-4xl">{overdue}</span>{' '}
                {getPluralForm(overdue, 'объект', 'объекта', 'объектов')}
              </p>
            </div>
          </div>
        }
      />
    </section>
  )
}
