import { Speedometer } from '@/shared/components/charts'
import { SmallCards } from '../cards/small-cards'
import { Histogram } from './histogram'
import { Card } from '@/shared/components'

export function TransferZp() {
  return (
    <section className="flex flex-col gap-4 flex-1 h-full">
      <Speedometer className="flex-1" value={117} maxValue={150} />
      <Card size="sm" className="flex-1">
        <Histogram
          className="flex-1"
          initialValue={50}
          weeklyIncrements={[1, 0, 1, 2, 3, 0, 2, 0]}
          colorScheme="blue"
        />
      </Card>
      <SmallCards daysToPlan={22} lastDate={38} overdue={1} />
    </section>
  )
}
