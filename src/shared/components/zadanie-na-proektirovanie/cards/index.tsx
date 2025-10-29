'use client'
import { Card } from '@/shared/components/card'
import { Progress } from '@/shared/ui'

interface CardsProps {
  showProgressAndKpi: boolean
}

export function Cards({ showProgressAndKpi }: CardsProps) {
  return (
    <div className="grid grid-cols-4 gap-12 shrink-0">
      <Card
        title="Утверждено"
        kpiValue={101}
        kpiAll={showProgressAndKpi ? 150 : undefined}
      >
        {showProgressAndKpi && (
          <div className="flex  flex-1 justify-center items-center gap-2 bg-foreground/5 rounded-b-md   px-3 w-2/3 rounded-lg">
            <Progress value={Math.round((101 / 150) * 100)} className="h-4 " />
            <span className="text-xl font-semibold">
              {Math.round((101 / 150) * 100)}%
            </span>
          </div>
        )}
      </Card>
      <Card title="Дата утверждения">
        <p className="text-5xl text-center flex-1 ">15.11.2025</p>
      </Card>
      <Card
        title="Передано"
        kpiValue={117}
        kpiAll={showProgressAndKpi ? 150 : undefined}
      >
        {showProgressAndKpi && (
          <div className="flex  flex-1 justify-center items-center gap-2 bg-foreground/5 rounded-b-md  px-3 w-2/3 rounded-lg">
            <Progress value={Math.round((117 / 150) * 100)} className="h-4 " />
            <span className="text-xl font-semibold">
              {Math.round((117 / 150) * 100)}%
            </span>
          </div>
        )}
      </Card>
      <Card title="Дата передачи">
        <p className="text-5xl text-center">25.11.2025</p>
      </Card>
    </div>
  )
}
