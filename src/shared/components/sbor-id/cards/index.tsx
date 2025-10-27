'use client'
import { Card } from '@/shared/components/card'
import { Progress } from '@/shared/ui'

export function Cards() {
  return (
    <div className="grid grid-cols-6 gap-6 shrink-0">
      <Card className="col-span-2 min-h-36" title="Телеграмма ИД">
        <div className="text-xl flex flex-col justify-center flex-1">
          <p>
            Отправлена:{' '}
            <span className="text-2xl font-semibold ">12.01.2026</span>{' '}
          </p>

          <p>
            Предоставить до:{' '}
            <span className="text-2xl font-semibold italic">25.01.2026</span>
          </p>
          <div className="flex justify-between gap-2">
            <p>
              Прошло дней: <span className="text-2xl  font-semibold ">4</span>
            </p>
            <p>
              До крайнего срока: <span className="text-2xl font-semibold ">9</span>
            </p>
          </div>
        </div>
      </Card>
      <Card
        className="col-span-2 min-h-36"
        title="Полный комплект"
        kpiValue={34}
        kpiAll={68}
      >
        <div className="flex flex-1 justify-center items-center gap-2 bg-foreground/5 rounded-b-md mt-2 -mx-3 -mb-3 px-3">
          <Progress value={68} className="h-4" />
          <span className="text-xl font-semibold">68%</span>
        </div>
      </Card>
      <Card
        className="col-span-1 min-h-36"
        title="Дата приближается"
        kpiValue={18}
      ></Card>
      <Card
        className="col-span-1 min-h-36"
        title="Дата прошла"
        kpiValue={5}
      ></Card>
    </div>
  )
}
