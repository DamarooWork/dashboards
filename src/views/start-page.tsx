import { Cards } from '@/shared/components/start-page'
import { Header } from '@/widgets'

export function   StartPage(){

  return (
    <section className="flex flex-col gap-12 flex-1 h-full">
      <Header title="Стартовый экран" />
      <Cards />
    </section>
  )
}