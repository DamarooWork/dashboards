'use client'

import { Cards, Charts } from './components'
import { Header } from '@/shared/components'

export function CollectionId() {

 
  return (
    <>
      <Header title="Сбор исходных данных" />
      <Cards />
      <Charts />
    </>
  )
}
