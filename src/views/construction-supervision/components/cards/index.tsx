import { Card } from '@/shared/components'

export function Cards() {
  return (
    <section className="grid grid-cols-4 gap-12 shrink-0">
      <Card title="Замечаний выявлено" kpiValue={1200} />
      <Card title="Замечаний устранено" kpiValue={950} />
      <Card title="Предписаний выдано" kpiValue={20} />
      <Card title="Предписаний устранено" kpiValue={5} />
    </section>
  )
}

