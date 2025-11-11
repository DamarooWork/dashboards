import { Card } from '@/shared/components/cards/card'

export function Cards() {
  return (
    <div className="grid grid-cols-4 gap-12 shrink-0">
      <Card title="Заключено" value={30}></Card>
      <Card title="Дата заключения">
        <p className="text-5xl text-center flex-1 ">15.11.2025</p>
      </Card>
      <Card title="Стоимость">
        <p className="text-5xl text-center flex-1 ">35 млн</p>
      </Card>
      <Card title="Лимит ЦЗ">
        <p className="text-5xl text-center flex-1 ">60 млн</p>
      </Card>
    </div>
  )
}

