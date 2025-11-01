import { Card } from '@/shared/components/cards/card'
import { getPluralForm } from '@/shared/lib/utils'

export function Cards() {
  return (
    <div className="grid grid-cols-4 gap-12 shrink-0">
      <Card
        title="Согласовано"
        kpiValue={46 + ' ' + getPluralForm(46, 'объект', 'объекта', 'объектов')}
      />
      <Card title="Стоимость предварительная" kpiValue="46 млн" />
      <Card title="Стоимость согласованная" kpiValue="39 млн" />
      <Card title="Лимит ЦЗ" kpiValue="25 млн" />
    </div>
  )
}
