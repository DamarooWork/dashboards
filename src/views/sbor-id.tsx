import { Cards, Dashboards } from '@/shared/components/sbor-id'

export async function SborId() {
  return (
    <section className="flex flex-col flex-1 w-full relative">
      <h1 className="text-4xl font-extrabold">ПАК ДИСЗ · «Сбор ИД»</h1>
      <Cards />
      <Dashboards />
    </section>
  )
}
