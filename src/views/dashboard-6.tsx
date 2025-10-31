import { Cards, Charts } from '@/shared/components/dashboard-6'
import { Header } from '@/widgets'

export async function Dashboard6() {
  return (
    <section className="flex flex-col gap-12 flex-1 overflow-hidden h-full">
      <Header title="Дашборд 6" />
      <Cards />
      <Charts />
    </section>
  )
}

