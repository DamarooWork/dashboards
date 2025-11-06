import { Cards, Charts } from './components'
import { Header } from '@/shared/components'

export async function ContractPir() {
  return (
    <>
      <Header title="Договор ПИР" />
      <Cards />
      <Charts />
    </>
  )
}
