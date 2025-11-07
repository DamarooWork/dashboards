'use client'

import { AlertCircle } from 'lucide-react'
import { Button } from '@/shared/ui'

interface ErrorProps {
  onRetry: () => void
  message?: string
}

export function Error({ onRetry, message = 'Ошибка загрузки данных' }: ErrorProps) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 p-6 rounded-lg border border-destructive/50 bg-destructive/10">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <p className="text-lg font-medium text-foreground">{message}</p>
        <Button onClick={onRetry} variant="outline" className="mt-2">
          Попробуйте еще раз
        </Button>
      </div>
    </div>
  )
}

