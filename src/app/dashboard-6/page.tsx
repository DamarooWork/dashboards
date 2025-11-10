import { Suspense } from 'react'
import { Dashboard6 } from '@/views'
import { Loading } from '@/shared/components'

export default function Dashboard6Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard6 />
    </Suspense>
  )
}

