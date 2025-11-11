import { Card } from '@/shared/components'

export function Cards() {
  return (
    <section className="grid grid-cols-4 gap-12 shrink-0">
      <Card title="Замечаний выявлено" value={1200} />
      <Card title="Замечаний устранено" value={950} />
      <Card title="Предписаний выдано" value={20} />
      <Card title="Предписаний устранено" value={5} />
    </section>
  )
}

