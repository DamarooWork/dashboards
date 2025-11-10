'use client'

import { Speedometer, Histogram } from '@/shared/components/charts'
import { Card, SmallCards } from '@/shared/components'
import { getPluralForm } from '@/shared/lib/utils'
import { useTransferZpData } from '../../hooks'
import { Loading, LoadingOverlay, Error } from '@/shared/components'

export function TransferZp() {
  const { transferZpData, isLoading, isFetching, error, refetch } =
    useTransferZpData()

  if (isLoading) {
    return (
      <section className="flex flex-col gap-4 flex-1 h-full items-center justify-center">
        <Loading />
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col gap-4 flex-1 h-full">
        <Error onRetry={() => refetch()} />
      </section>
    )
  }

  const {
    providedQuantity,
    totalQuantity,
    daysTillPlannedDate,
    nearDeadlineQuantity,
    deadlineCrossedQuantity,
    prevPeriodProvidedQuantity,
    weeklyIncrements,
  } = transferZpData

  return (
    <section className="flex flex-col gap-4 flex-1 h-full relative">
      <LoadingOverlay isLoading={isFetching} />
      <Speedometer
        className="basis-1/2"
        value={providedQuantity}
        maxValue={totalQuantity}
      />
      <Card className="basis-1/2" size="sm">
        <Histogram
          initialValue={prevPeriodProvidedQuantity}
          weeklyIncrements={weeklyIncrements}
          colorScheme="blue"
        />
      </Card>
      <SmallCards
        title1="Дней до плановой даты"
        title2="Дата передачи"
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
