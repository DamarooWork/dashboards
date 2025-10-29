import { Card } from '@/shared/components'
import { Doughnut } from '@/shared/components/start-page'

interface Props {
  className?: string
}
export function Cards({ className }: Props) {
  return (
    <div className="grid grid-cols-3 gap-12 shrink-0 flex-1 h-full">
      <Card title="Объекты ремонта" size="lg">
        <Doughnut className="h-full w-full mb-16" />
      </Card>
      <Card className='flex flex-col justify-around' title="Выполнение объемов CMP" size="lg">
        <Card
          title="Разворот работ"
          size="sm"
          startPage={{
            title1: 'Разворот работ',
            title2: 'Километры',
            value1: 8,
            plan1: 78,
            value2: 31,
            plan2: 320,
          }}
        />
        <Card
          title="Разворот работ"
          size="sm"
          startPage={{
            title1: 'Разворот работ',
            title2: 'Километры',
            value1: 8,
            plan1: 78,
            value2: 31,
            plan2: 320,
          }}
        />
        <Card
          title="Разворот работ"
          size="sm"
          startPage={{
            title1: 'Разворот работ',
            title2: 'Километры',
            value1: 8,
            plan1: 78,
            value2: 31,
            plan2: 320,
          }}
        />
        <Card
          title="Разворот работ"
          size="sm"
          startPage={{
            title1: 'Разворот работ',
            title2: 'Километры',
            value1: 8,
            plan1: 78,
            value2: 31,
            plan2: 320,
          }}
        />
      </Card>
      <Card title="Финансовое освоение" size="lg"></Card>
    </div>
  )
}
