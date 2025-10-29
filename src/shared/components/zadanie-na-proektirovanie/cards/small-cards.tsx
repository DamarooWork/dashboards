import { Card } from "@/shared/components"

interface Props {
  daysToPlan?: number
  lastDate?: number
  overdue?: number
}
export  function  SmallCards({ daysToPlan = 0, lastDate = 0, overdue = 0}:Props){

  return (
    <div className="grid grid-cols-3 gap-4">
        <Card title="Дней до плановой даты" size="sm">
          <p className="text-3xl font-bold">{daysToPlan} д.</p>
        </Card>
        <Card title="Крайний срок" size="sm">
          <p className="text-3xl font-bold">{lastDate}</p>
        </Card>
        <Card title="Просрочено" size="sm">
          <p className="text-3xl font-bold">{overdue}</p>
        </Card>
      </div>
  )
}