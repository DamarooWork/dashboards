import { Cards, Dashboards } from '@/shared/components/sbor-id'

export async function SborId() {
  return (
    <section className="flex flex-col flex-1 w-full relative overflow-hidden gap-4">
      <h1 className="text-3xl font-bold text-background shrink-0">
        Сбор исходных данных
      </h1>
      <Cards />
      <Dashboards />
    </section>
  )
}
