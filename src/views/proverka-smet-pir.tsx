import { Cards, Charts } from '@/shared/components/proverka-smet-pir'
import { Header } from '@/widgets'

export async function ProverkaSmetPir() {
  return (
    <section className="flex flex-col gap-12 flex-1 overflow-hidden h-full">
      <Header title="Проверка Смет ПИР" />
      <Cards />
      <Charts />
    </section>
  )
}

