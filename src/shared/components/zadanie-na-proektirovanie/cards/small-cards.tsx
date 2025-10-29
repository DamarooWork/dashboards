import { Card } from "@/shared/components"
import { getPluralForm } from "@/shared/lib/utils"

interface Props {
  daysToPlan?: number
  lastDate?: number
  overdue?: number
  title2: string
}
export  function  SmallCards({ daysToPlan = 0, lastDate = 0, overdue = 0, title2 }:Props){

  return (
    <div className="grid grid-cols-2 gap-4">
        <Card title="Дней до плановой даты" size="sm">
          <p className="text-4xl">{daysToPlan} д.</p>
        </Card>
        <Card title={title2} size="sm">
        <div className="text-2xl flex flex-col justify-center">
          <div className="flex flex-col">
            <p>
              Приближается: <span className="text-4xl">21</span>{' '}
              {getPluralForm(21, 'объект', 'объекта', 'объектов')}
            </p>
            <p>
              Истекла: <span className="text-4xl ">4</span>{' '}
              {getPluralForm(4, 'объект', 'объекта', 'объектов')}
            </p>
          </div>
        </div>
        </Card>
       
      </div>
  )
}