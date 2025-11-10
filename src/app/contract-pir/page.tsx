import { Suspense } from 'react'
import { ContractPir } from '@/views'
import { Loading } from '@/shared/components'

export default function ContractPirPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ContractPir />
    </Suspense>
  )
}
