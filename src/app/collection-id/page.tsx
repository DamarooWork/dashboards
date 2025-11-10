import { Suspense } from 'react'
import { CollectionId } from '@/views'
import { Loading } from '@/shared/components'

export default async function CollectionIdPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CollectionId />
    </Suspense>
  )
}
