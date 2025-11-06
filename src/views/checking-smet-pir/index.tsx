import { Cards, Charts } from './components'
import { Header } from '@/shared/components'

export async function CheckingSmetPir() {
  return (
    <>
      <Header title="Проверка Смет ПИР" />
      <Cards />
      <Charts />
    </>
  )
}
