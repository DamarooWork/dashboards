import { Cards, Charts } from './components'
import { Header } from '@/shared/components'
import { apiClient } from '@/shared/lib/api/axios'

export async function CollectionId() {
  try {
    const { data } = await apiClient.post(
      '/json/v2/view/portfolio_last_telegram'
    )
  } catch (e) {
    console.error('portfolio_last_telegram request failed')
  }

  return (
    <>
      <Header title="Сбор исходных данных" />
      <Cards />
      <Charts />
    </>
  )
}
