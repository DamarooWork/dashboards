import { Suspense } from 'react'
import { ConstructionSupervision } from "@/views"
import { Loading } from '@/shared/components'

export default function ConstructionSupervisionPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ConstructionSupervision />
    </Suspense>
  )
}