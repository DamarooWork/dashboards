'use client'
import { Card } from '@/shared/components/cards/card'
import { Progress } from '@/shared/ui'
import { useChartSwitchStore } from '@/shared/store'
import { useCardsData } from '@/views/design-assignment/hooks'
import { Loading } from '@/shared/components'
import { formatDate } from '@/shared/lib/utils'



export function Cards() {
  const { chartSwitchStatus } = useChartSwitchStore()
  const { cardsData, isLoading } = useCardsData()
  const showProgressAndKpi = !chartSwitchStatus

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


  const approvedPercent =
    cardsData.totalCount > 0
      ? Math.round((cardsData.approvedCount / cardsData.totalCount) * 100)
      : 0

  const transferredPercent =
    cardsData.totalCount > 0
      ? Math.round((cardsData.transferredCount / cardsData.totalCount) * 100)
      : 0

  return (
    <div className="grid grid-cols-4 gap-12 shrink-0">
      <Card
        title="Утверждено"
        kpiValue={cardsData.approvedCount}
        kpiAll={showProgressAndKpi ? cardsData.totalCount : undefined}
      >
        {showProgressAndKpi && (
          <div className="flex  flex-1 justify-center items-center gap-2 bg-foreground/5 rounded-b-md   px-3 w-2/3 rounded-lg">
            <Progress value={approvedPercent} className="h-4 " />
            <span className="text-xl font-semibold">{approvedPercent}%</span>
          </div>
        )}
      </Card>
      <Card title="Дата утверждения">
        <p className="text-5xl text-center flex-1 ">
          {formatDate(cardsData.approvalDate)}
        </p>
      </Card>
      <Card
        title="Передано"
        kpiValue={cardsData.transferredCount}
        kpiAll={showProgressAndKpi ? cardsData.totalCount : undefined}
      >
        {showProgressAndKpi && (
          <div className="flex  flex-1 justify-center items-center gap-2 bg-foreground/5 rounded-b-md  px-3 w-2/3 rounded-lg">
            <Progress value={transferredPercent} className="h-4 " />
            <span className="text-xl font-semibold">{transferredPercent}%</span>
          </div>
        )}
      </Card>
      <Card title="Дата передачи">
        <p className="text-5xl text-center">
          {formatDate(cardsData.transferDate)}
        </p>
      </Card>
    </div>
  )
}
