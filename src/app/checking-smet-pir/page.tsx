import { Suspense } from 'react'
import { CheckingSmetPir } from '@/views'
import { Loading } from '@/shared/components'

export default function CheckingSmetPirPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckingSmetPir />
    </Suspense>
  )
}
