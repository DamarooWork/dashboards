import { cn } from '../lib/utils'

type kpiResult = 'success' | 'failure' | 'neutral'
interface Props {
  className?: string
  title?: string
  children?: React.ReactNode
  kpiValue?: number
  kpiChange?: number
  kpiAll?: number
  kpiResult?: kpiResult
  dashboard?: boolean
}
export function Card({
  className,
  children,
  title,
  kpiValue,
  kpiChange,
  kpiResult,
  kpiAll,
  dashboard,
}: Props) {
  return (
    <div
      className={cn(
        'rounded-xl bg-card border border-fill overflow-hidden p-3 shadow-md min-h-36 flex flex-col shadow-foreground',
        dashboard &&
          'active:scale-90 will-change-transform transition-all duration-200',
        className
      )}
    >
      {title && (
        <h3 className={cn('font-semibold text-2xl  pb-2 -mx-3 px-3 shrink-0')}>
          {title}
        </h3>
      )}
      {kpiValue && (
        <div className="text-4xl  text-center flex-1 flex items-center justify-center">
          <span className="mr-2">{kpiValue}</span>

          <span>{kpiAll ? `из ${kpiAll} объектов` : 'объектов'}</span>
        </div>
      )}

      {children}
    </div>
  )
}
