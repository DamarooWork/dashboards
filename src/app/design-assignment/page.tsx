import { Suspense } from 'react'
import { DesignAssignment } from '@/views'
import { Loading } from '@/shared/components'

export default function DesignAssignmentPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DesignAssignment />
    </Suspense>
  )
}
