'use client'
import { Card } from '@/shared/components/card'

export function Cards() {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4 max-h-42">
      <Card title="Телеграмма ИД">
        <div className=" text-2xl">
          <p>
            Отправлена: <b className="text-4xl text-foreground">12.01.2026</b>{' '}
          </p>
          <p>
            Предоставить до:{' '}
            <b className="text-2xl text-foreground">25.01.2026</b>
          </p>
          <p>
            Прошло дней: <b className="text-2xl text-foreground mr-4">14</b> До
            дедлайна: <b className="text-2xl text-foreground">9</b>
          </p>
        </div>
      </Card>
      <Card
        title="Полный комплект"
        kpiValue={34}
        kpiChange={6}
        kpiResult="success"
      >
        <div>
          <p className="text-muted-foreground text-2xl">68% из 62 объектов</p>
        </div>
      </Card>
      <Card
        title="Дата приближается"
        kpiValue={18}
        kpiChange={0}
        kpiResult="neutral"
      >
        <p className="text-muted-foreground text-2xl">29% из 62 объектов</p>
      </Card>
      <Card title="Дата прошла" kpiValue={5} kpiChange={3} kpiResult="failure">
        <p className="text-muted-foreground text-2xl">8% из 62 объектов</p>
      </Card>
    </div>
  )
}
