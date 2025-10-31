import { Cards, Charts } from '@/shared/components/dogovor-pir'
import { Header } from '@/widgets'

export async function DogovorPir() {
  return (
    <section className="flex flex-col gap-12 flex-1 overflow-hidden h-full">
      <Header title="Договор ПИР" />
      <Cards />
      <Charts />
    </section>
  )
}
