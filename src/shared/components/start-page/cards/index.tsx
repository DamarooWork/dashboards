import { Card } from "@/shared/components"
import { Doughnut } from "@/shared/components/start-page"

interface Props {
  className?: string
}
export  function  Cards({className}:Props){
  return (
    <div className="grid grid-cols-3 gap-12 shrink-0 flex-1 h-full">
      <Card title="Объекты ремонта" size="lg">
        <Doughnut/>        
      </Card>
      <Card title="Выполнение объемов CMP" size="lg">
      <Card title="Разворот работ" size="sm">
                
      </Card>       
      </Card>
      <Card title="Финансовое освоение" size="lg">
               
      </Card>
    </div>
  )
}