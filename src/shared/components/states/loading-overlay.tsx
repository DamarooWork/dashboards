'use client'

import { Spinner } from '@/shared/ui'

interface LoadingOverlayProps {
  isLoading: boolean
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) {
    return null
  }

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center  backdrop-blur-sm rounded-lg">
      <Spinner className="h-8 w-8" />
    </div>
  )
}
