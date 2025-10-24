'use client'
import { Card } from '@/shared/components/card'
import Chart from './chart'

interface Props {
  className?: string
}
export function Dashboard({ className }: Props) {
  return (
    <Card className={'my-6 flex-1 max-h-[75vh] flex items-center'}>
      <Chart />
    </Card>
  )
}
