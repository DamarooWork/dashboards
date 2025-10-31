import { Card } from '@/shared/components/card'

export function Charts() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      <section className="flex flex-1 gap-12 overflow-hidden min-h-0">
        <Card className="basis-1/2" />
        <Card className="basis-1/2" />
      </section>
    </div>
  )
}
