import { Cards, Charts } from '@/shared/components/sbor-id'
import { Header } from '@/widgets'

export async function SborId() {
  // try {
  //   const response = await fetch('http://localhost:3000/api/ip_ppm')
  //   const data = await response.json()
  //   console.log(data)
  // } catch (error) {
  //   console.error('Ошибка запроса:', error)
  // }
  return (
    <section className="flex flex-col flex-1 w-full  overflow-hidden gap-12">
      <Header title="Сбор исходных данных" />
      <Cards />
      <Charts />
    </section>
  )
}
