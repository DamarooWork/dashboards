import { Cards, Charts } from "@/shared/components/construction-supervision"
import { Header } from "@/widgets"
interface Props {
  className?: string
}
export  function  ConstructionSupervision({className}:Props){

  return (
    <section className="flex flex-col gap-12 flex-1 overflow-hidden h-full">
      <Header title="Строительный контроль" />
      <Cards />
      <Charts/>
    </section>
  )
}