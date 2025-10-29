import { Cards } from "@/shared/components/construction-supervision"
import { Header } from "@/widgets"
interface Props {
  className?: string
}
export  function  ConstructionSupervision({className}:Props){

  return (
    <section className="flex flex-col gap-12 flex-1 h-full">
      <Header title="Строительный контроль" />
      <Cards />
    </section>
  )
}