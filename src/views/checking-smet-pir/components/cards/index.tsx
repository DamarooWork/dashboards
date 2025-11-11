import { Card } from '@/shared/components/cards/card'
import { getPluralForm } from '@/shared/lib/utils'

export function Cards() {
  return (
    <div className="grid grid-cols-4 gap-12 shrink-0">
      <Card
        title="Согласовано"
        value={46 + ' ' + getPluralForm(46, 'объект', 'объекта', 'объектов')}
      />
      <Card title="Стоимость сметная" value="46 млн" />
      <Card title="Стоимость согласованная" value="39 млн" />
      <Card title="Лимит ЦЗ" value="25 млн" />
    </div>
  )
}
