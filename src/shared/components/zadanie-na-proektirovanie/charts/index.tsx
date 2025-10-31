'use client'
import { Card } from '@/shared/components/card'
import { useChartSwitchStore } from '@/shared/store'
import { ApprovedZP } from './approved-zp'
import { ApprovedTransferByRoads } from './approved-transfer-by-roads'
import { TransferZp } from './transfer-zp'

export function Charts() {
  const { chartSwitchStatus } = useChartSwitchStore()
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      {chartSwitchStatus === false && (
        <Card className={'flex-1 min-h-0'}>
          <ApprovedTransferByRoads />
        </Card>
      )}
      {chartSwitchStatus === true && (
        <section className="flex flex-1 gap-12 overflow-hidden min-h-0">
          <Card className="basis-1/2  pt-8">
            <ApprovedZP />
          </Card>
          <Card className={' basis-1/2  pt-8'}>
            <TransferZp />
          </Card>
        </section>
      )}
    </div>
  )
}
