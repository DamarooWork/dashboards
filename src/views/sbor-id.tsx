import { Cards, Dashboard } from '@/shared/components/sbor-id'

export async function SborId() {
  return (
    <section className="flex flex-col w-full">
      <h1 className="text-2xl font-extrabold">ПАК ДИСЗ · «Сбор ИД»</h1>
      <Cards />
      <Dashboard />
    </section>
  )
}
