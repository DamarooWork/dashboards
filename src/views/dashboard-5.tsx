import { Cards, Charts } from '@/shared/components/dashboard-5'
import { Header } from '@/widgets'

export async function Dashboard5() {
  return (
    <section className="flex flex-col gap-12 flex-1 overflow-hidden h-full">
      <Header title="Дашборд 5" />
      <Cards />
      <Charts />
    </section>
  )
}

