import { Card } from '@/shared/components'
import { Doughnut } from '@/views/start-screen/components/charts'
import { CmpExecutionCard } from './cmp-execution-card'
import { FinDevelopmentCard } from './fin-development-card'

interface Props {
  className?: string
}
export function Cards({ className }: Props) {
  return (
    <div className="grid grid-cols-3 gap-12 shrink-0 flex-1 h-full">
      <Card title="Объекты ремонта" size="lg">
        <Doughnut className="h-full w-full" />
      </Card>
      <CmpExecutionCard />
      <FinDevelopmentCard />
    </div>
  )
}
