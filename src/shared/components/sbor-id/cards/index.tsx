'use client'
import { Card } from '@/shared/components/card'
import { Progress } from '@/shared/ui'

export function Cards() {
  return (
    <div className="grid grid-cols-4 gap-12 shrink-0">
      <Card className=" min-h-36" title="Телеграмма передана">
        <div className="text-2xl flex flex-col justify-center flex-1">
          <p className="text-4xl">12.01.2026</p>
          <div className="flex gap-2">
            <p>
              Прошло дней: <span className="text-2xl  font-semibold ">4</span>
            </p>
          </div>
        </div>
      </Card>
      <Card
        className="min-h-36"
        title="Полный комплект"
        kpiValue={34}
        kpiAll={68}
      >
        <div className="flex self-center flex-1 justify-center items-center gap-2 bg-foreground/5 rounded-b-md mt-2  px-3 w-2/3 rounded-lg">
          <Progress value={68} className="h-4 " />
          <span className="text-xl font-semibold">68%</span>
        </div>
      </Card>
      <Card
        className="col-span-1 min-h-36"
        title="Дата приближается"
        kpiValue={18}
      >
        <p className='text-2xl'>
          Предоставить до:{' '}
          <span className=" font-semibold">25.01.2026</span>
        </p>
      </Card>
      <Card className="col-span-1 min-h-36" title="Дата прошла" kpiValue={5}>
        <p className='text-2xl'>
          Дней осталось: <span className=" font-semibold ">9</span>
        </p>
      </Card>
    </div>
  )
}
