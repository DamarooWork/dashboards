'use client'
import { Card } from '@/shared/components/cards/card'
import { getPluralForm } from '@/shared/lib/utils'
import { Progress } from '@/shared/ui'
import { useCardsData } from '@/views/collection-id/hooks/use-cards-data'
import { Loading } from '@/shared/components'

function formatDate(dateString: string | null): string {
  if (!dateString) return '—'
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

export function Cards() {
  const { portfolioCardData, statusCardData, isLoading } = useCardsData()

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-12 shrink-0">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} title="">
            <Loading />
          </Card>
        ))}
      </div>
    )
  }

  const percent =
    statusCardData.totalCount > 0
      ? Math.round(
          (statusCardData.completedCount / statusCardData.totalCount) * 100
        )
      : 0

  return (
    <div className="grid grid-cols-4 gap-12 shrink-0">
      <Card title="Телеграмма передана">
        <div className="text-2xl flex flex-col justify-center text-center">
          <p className="text-5xl">
            {formatDate(portfolioCardData.latestTelegramDate)}
          </p>
          <p>
            Прошло дней:{' '}
            <span className="text-3xl">
              {portfolioCardData.daysSinceStart ?? '—'}
            </span>
          </p>
        </div>
      </Card>
      <Card
        title="Полный комплект"
        value={statusCardData.completedCount}
        total={statusCardData.totalCount}
      >
        <div className="flex flex-1 justify-center items-center gap-2 bg-foreground/5 rounded-b-md px-3 w-2/3 rounded-lg">
          <Progress value={percent} className="h-4" />
          <span className="text-xl font-semibold">{percent}%</span>
        </div>
      </Card>
      <Card title="Предоставить до">
        <div className="text-center">
          <p className="text-5xl">
            {formatDate(portfolioCardData.plannedFinish)}
          </p>
          <p className="text-2xl">
            Дней осталось:{' '}
            <span className="text-3xl">
              {portfolioCardData.daysTillDeadline ?? '—'}
            </span>
          </p>
        </div>
      </Card>
      <Card title="Дата передачи">
        <div className="text-2xl flex flex-col justify-center">
          <div className="flex flex-col gap-2">
            <p>
              Приближается:{' '}
              <span className="text-3xl">{statusCardData.inworkCount}</span>{' '}
              {getPluralForm(
                statusCardData.inworkCount,
                'объект',
                'объекта',
                'объектов'
              )}
            </p>
            <p>
              Истекла:{' '}
              <span className="text-3xl">{statusCardData.overdueCount}</span>{' '}
              {getPluralForm(
                statusCardData.overdueCount,
                'объект',
                'объекта',
                'объектов'
              )}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
