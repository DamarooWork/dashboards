import { Card } from '@/shared/components'

interface Props {
  daysToPlan?: number
  title2: string
  title1: string
}
export function SmallCards({
  daysToPlan = 0,
  title2,
  title1,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card title={title1} size="sm">
        <p className="text-5xl text-center h-full flex items-center justify-center">
          {daysToPlan}
        </p>
      </Card>
      <Card title={title2} size="sm">
      <p className="text-5xl text-center h-full flex items-center justify-center">
          ????
        </p>
      </Card>
    </div>
  )
}
