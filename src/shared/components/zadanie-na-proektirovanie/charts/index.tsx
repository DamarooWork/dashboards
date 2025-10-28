'use client'
import { Card } from '@/shared/components/card'
import { useState } from 'react'
import { Switch } from '@/shared/ui'
import { ApprovedZP } from './approved-zp'
import { ApprovedTransferByRoads } from './approved-transfer-by-roads'
import { TransferZp } from './transfer-zp'

export function Charts() {
  const [chartSwitchStatus, setChartSwitchStatus] = useState<boolean>(true)
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      <Switch
        className="absolute bottom-4 left-4"
        onCheckedChange={() =>
          setChartSwitchStatus(chartSwitchStatus === false ? true : false)
        }
      >
        Switch
      </Switch>{' '}
      {chartSwitchStatus === true && (
        <Card className={'flex-1 min-h-0'}>
          <ApprovedTransferByRoads />
        </Card>
      )}
      {chartSwitchStatus === false && (
        <section className="flex flex-1 gap-12 overflow-hidden min-h-0">
          <Card className="basis-1/2 min-h-0" title="Утвержденные">
            <ApprovedZP />
          </Card>
          <Card className={' basis-1/2 min-h-0'} title="Передача">
            <TransferZp />
          </Card>
        </section>
      )}{' '}
    </div>
  )
}
