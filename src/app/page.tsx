import { Suspense } from 'react'
import { StartScreen } from '@/views'
import { Loading } from '@/shared/components'

export default async function StartScreenPage() {
  return (
    <Suspense fallback={<Loading />}>
      <StartScreen />
    </Suspense>
  )
}
