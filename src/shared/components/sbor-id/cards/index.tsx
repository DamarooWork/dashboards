'use client'
import { Card } from '@/shared/components/card'
import { Progress } from '@/shared/ui'

export function Cards() {
  return (
    <div className="grid grid-cols-4 gap-12 mt-8 max-h-42">
      <Card title="Телеграмма ИД">
        <div className=" text-2xl">
          <p>
            Отправлена: <b className="text-3xl text-foreground">12.01.2026</b>{' '}
          </p>
          <p>
            Предоставить до:{' '}
            <b className="text-2xl text-foreground">25.01.2026</b>
          </p>
          <p>
            Прошло дней: <b className="text-2xl text-foreground mr-2">14</b> До
            дедлайна: <b className="text-2xl text-foreground">9</b>
          </p>
        </div>
      </Card>
      <Card
        title="Полный комплект"
        kpiValue={34}
        kpiChange={6}
        kpiResult="success"
        kpiAll={68}
      >
        <div className="flex flex-1 justify-center items-center gap-2 bg-foreground/10 rounded-b-md p-2 mt-2 -mx-3.5 -mb-3.5 ">
          <Progress value={68} className="h-4" />
          <span className="text-2xl">68%</span>
        </div>
      </Card>
      <Card
        title="Дата приближается"
        kpiValue={18}
        kpiChange={0}
        kpiResult="neutral"
      >
        <p className="text-2xl bg-foreground/10 rounded-md p-2 mt-2 w-fit">
          29% из 62 объектов
        </p>
      </Card>
      <Card title="Дата прошла" kpiValue={5} kpiChange={3} kpiResult="failure">
        <p className="text-2xl bg-foreground/10 rounded-md p-2 mt-2 w-fit">
          8% из 62 объектов
        </p>
      </Card>
    </div>
  )
}
