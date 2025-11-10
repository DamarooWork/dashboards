'use client'

import { Spinner } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'

export function Loading({ className }: { className?: string }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner className={cn('h-8 w-8', className)} />
    </div>
  )
}
