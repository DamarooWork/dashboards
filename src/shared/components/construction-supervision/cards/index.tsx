import { Card } from "@/shared/components";


export  function  Cards(){
  return (
    <section className='grid grid-cols-4 gap-12 shrink-0'>
      <Card title="Замечаний выявлено" kpiValue={101} >
      </Card>
      <Card title="Выполнение объемов CMP">
      <Card title="Разворот работ">
                
      </Card>       
      </Card>
      <Card title="Финансовое освоение">
               
      </Card>
    </section>
  )
}