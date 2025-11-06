import { Cards } from './components'
import { Header } from '@/shared/components'

export async function StartScreen() {
 
  return (
    <>
      <Header title="Стартовый экран" />
      <Cards />
    </>
  )
}
