import { Cards, Charts } from '@/shared/components/dashboard-7'
import { Header } from '@/widgets'

export async function Dashboard7() {
  return (
    <section className="flex flex-col gap-12 flex-1 overflow-hidden h-full">
      <Header title="Дашборд 7" />
      <Cards />
      <Charts />
    </section>
  )
}

