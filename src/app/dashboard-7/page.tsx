import { Suspense } from 'react'
import { Dashboard7 } from '@/views'
import { Loading } from '@/shared/components'

export default function Dashboard7Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard7 />
    </Suspense>
  )
}

