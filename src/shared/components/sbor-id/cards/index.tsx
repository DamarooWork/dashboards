'use client'
import { Card } from '@/shared/components/card'
import { getPluralForm } from '@/shared/lib/utils'
import { Progress } from '@/shared/ui'

export function Cards() {
  return (
    <div className="grid grid-cols-4 gap-12 shrink-0">
      <Card title="Телеграмма передана">
        <div className="text-2xl flex flex-col justify-center">
          <p className="text-4xl">12.01.2026</p>
          <div className="flex gap-2">
            <p>
              Прошло дней: <span className="text-3xl   ">4</span>
            </p>
          </div>
        </div>
      </Card>
      <Card title="Полный комплект" kpiValue={34} kpiAll={68}>
        <div className="flex  flex-1 justify-center items-center gap-2 bg-foreground/5 rounded-b-md mt-2  px-3 w-2/3 rounded-lg">
          <Progress value={68} className="h-4 " />
          <span className="text-xl font-semibold">68%</span>
        </div>
      </Card>
      <Card title=" Предоставить до">
        <div>
          <p className="text-4xl">25.01.2026</p>{' '}
          <p className="text-2xl">
            Дней осталось: <span className="text-3xl  ">9</span>
          </p>
        </div>
      </Card>
      <Card title="Дата передачи ">
      <div className="text-2xl flex flex-col justify-center">
          <div className="flex flex-col gap-2">
            <p>
            Приближается: <span className="text-3xl   ">21</span>{' '}{getPluralForm(21, 'объект', 'объекта', 'объектов')}
            </p>
            <p>
            Истекла: <span className="text-3xl ">4</span>{' '}{getPluralForm(4, 'объект', 'объекта', 'объектов')}
            </p>
           
          </div>
        </div>
      </Card>
    </div>
  )
}
