import { Cards, Charts } from '@/shared/components/zadanie-na-proektirovanie'
import { Header } from '@/widgets'

export function ZadanieNaProektirovanie() {
  return (
    <section className="flex flex-col flex-1 w-full   gap-12">
      <Header title="Задание на проектирование" />
      <Cards />
      <Charts />
    </section>
  )
}
