import { Card } from '@/shared/components'
import { Doughnut } from '@/views/start-screen/components/charts'

interface Props {
  className?: string
}
export function Cards({ className }: Props) {
  return (
    <div className="grid grid-cols-3 gap-12 shrink-0 flex-1 h-full">
      <Card  title="Объекты ремонта" size="lg">
        <Doughnut className="h-full w-full" />
      </Card>
      <Card
        className="flex flex-col justify-between"
        title="Выполнение объемов CMP"
        size="lg"
      >
        <Card
          title="Разворот работ"
          size="sm"
          startPage={{
            title1: 'Объекты',
            title2: 'Километры',
            value1: 8,
            plan1: 78,
            value2: 31,
            plan2: 320,
          }}
        />
        <Card
          title="Выполнение работ"
          size="sm"
          startPage={{
            title1: 'Объекты',
            title2: 'Километры',
            value1: 8,
            plan1: 78,
            value2: 31,
            plan2: 320,
          }}
        />
        <Card
          title="ПУ-48"
          size="sm"
          startPage={{
            title1: 'Объекты',
            title2: 'Километры',
            value1: 8,
            plan1: 78,
            value2: 31,
            plan2: 320,
          }}
        />
        <Card
          title="ФСУ-5П"
          size="sm"
          startPage={{
            title1: 'Объекты',
            title2: 'Километры',
            value1: 8,
            plan1: 78,
            value2: 31,
            plan2: 320,
          }}
        />
      </Card>
      <Card
        className="flex flex-col justify-between"
        title="Финансовое освоение"
        size="lg"
      >
        <Card
          title="Общее освоение"
          size="sm"
          startPage={{
            title1: 'Млн. руб.',
            title2: 'Отклонение',
            value1: 1630,
            plan1: 2190,
            value2: -1280,
          }}
        />
        <Card
          title="Хоз. способ"
          size="sm"
          startPage={{
            title1: 'Млн. руб.',
            title2: 'Отклонение',
            value1: 1630,
            plan1: 2190,
            value2: -1280,
          }}
        />
        <Card
          title="Сторонний подряд"
          size="sm"
          startPage={{
            title1: 'Млн. руб.',
            title2: 'Отклонение',
            value1: 1630,
            plan1: 2190,
            value2: -1280,
          }}
        />
        <Card
          title="ПИР"
          size="sm"
          startPage={{
            title1: 'Млн. руб.',
            title2: 'Отклонение',
            value1: 1630,
            plan1: 2190,
            value2: -1280,
          }}
        />
      </Card>
    </div>
  )
}

