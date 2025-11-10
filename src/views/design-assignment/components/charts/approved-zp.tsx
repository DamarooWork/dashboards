'use client'

import { Speedometer, Histogram } from '@/shared/components/charts'
import { Card, SmallCards } from '@/shared/components'
import { getPluralForm } from '@/shared/lib/utils'
import { useApprovedZpData } from '../../hooks'
import { Loading, LoadingOverlay, Error } from '@/shared/components'

export function ApprovedZP() {
  const { approvedZpData, isLoading, isFetching, error, refetch } =
    useApprovedZpData()

  if (isLoading) {
    return (
      <section className="flex flex-col gap-4 h-full flex-1 items-center justify-center">
        <Loading />
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col gap-4 h-full flex-1">
        <Error onRetry={() => refetch()} />
      </section>
    )
  }

  const {
    approvedQuantity,
    totalQuantity,
    daysTillPlannedDate,
    nearDeadlineQuantity,
    deadlineCrossedQuantity,
    prevPeriodApprovedQuantity,
    weeklyIncrements,
  } = approvedZpData

  return (
    <section className="flex flex-col gap-4 h-full flex-1 relative">
      <LoadingOverlay isLoading={isFetching} />
      <Speedometer
        className="basis-1/2"
        value={approvedQuantity}
        maxValue={totalQuantity}
      />
      <Card className="basis-1/2" size="sm">
        <Histogram
          initialValue={prevPeriodApprovedQuantity}
          weeklyIncrements={weeklyIncrements}
        />
      </Card>
      <SmallCards
        title1="Дней до плановой даты"
        title2="Дата утверждения"
        value1={daysTillPlannedDate ?? 0}
        value2={
          <div className="text-2xl flex flex-col justify-center">
            <div className="flex flex-col">
              <p>
                Приближается:{' '}
                <span className="text-4xl">{nearDeadlineQuantity}</span>{' '}
                {getPluralForm(
                  nearDeadlineQuantity,
                  'объект',
                  'объекта',
                  'объектов'
                )}
              </p>
              <p>
                Истекла:{' '}
                <span className="text-4xl">{deadlineCrossedQuantity}</span>{' '}
                {getPluralForm(
                  deadlineCrossedQuantity,
                  'объект',
                  'объекта',
                  'объектов'
                )}
              </p>
            </div>
          </div>
        }
      />
    </section>
  )
}
