import { Speedometer } from '@/shared/components/charts'
import { SmallCards } from '../cards/small-cards'
import { Histogram } from './histogram'
import { Card } from '@/shared/components'

export function ApprovedZP() {
  return (
    <section className="flex flex-col gap-4 h-full justify-between">
      <Speedometer value={101} maxValue={150} />
      <Card small>

      <Histogram initialValue={50} weeklyIncrements={[1, 0, 1, 2, 3, 0, 2, 0]} colorScheme="green" />
      </Card>
      <SmallCards daysToPlan={12} lastDate={59} overdue={1} />
    </section>
  )
}
