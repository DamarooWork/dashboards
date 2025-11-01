import { Card } from '@/shared/components'
import { ReactNode } from 'react'

interface Props {
  title1: string
  title2: string
  value1?: string | ReactNode
  value2?: string | ReactNode
}

export function SmallCards({ title1, title2, value1, value2 }: Props) {
  const renderValue = (value: string | ReactNode | undefined) => {
    if (value === undefined || value === null) {
      return null
    }

    if (typeof value === 'string' || typeof value === 'number') {
      return (
        <p className="text-5xl text-center h-full flex items-center justify-center">
          {value}
        </p>
      )
    }

    return (
      <div className="h-full flex items-center">{value}</div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card title={title1} size="sm">
        {renderValue(value1)}
      </Card>
      <Card title={title2} size="sm">
        {renderValue(value2)}
      </Card>
    </div>
  )
}

