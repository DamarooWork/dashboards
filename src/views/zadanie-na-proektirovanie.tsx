import { Cards, Charts } from '@/shared/components/zadanie-na-proektirovanie'
import { Header } from '@/widgets'

export async function ZadanieNaProektirovanie() {
  return (
    <section className="flex flex-col flex-1 w-full  overflow-hidden gap-12">
      <Header title="Задание на проектирование" />
      <Cards />
      <Charts />
    </section>
  )
}
