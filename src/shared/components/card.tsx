import { cn, getPluralForm } from '../lib/utils'

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
  active?: boolean
  small?: boolean
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
  active,
  small,
}: Props) {
  return (
    <div
      className={cn(
        'rounded-xl bg-card border border-border overflow-hidden px-8 py-2 shadow-md min-h-36 flex flex-col shadow-primary  ',
        dashboard &&
          'active:scale-95 will-change-transform transition-all duration-200',
        active && 'ring-2 ring-primary bg-primary/10',
        small && 'px-4 min-h-24 shadow-none',
        className
      )}
    >
      {title && (
        <h3
          className={cn(
            'font-semibold text-2xl  pb-2 -mx-3 px-3 shrink-0',
            small && 'text-lg'
          )}
        >
          {title}
        </h3>
      )}
      {kpiValue && (
        <div className="w-full flex-1">
          <p className="text-5xl text-center">{kpiValue}</p>
        </div>
      )}
      {kpiAll ? (
        <div className="flex flex-row justify-between items-center gap-4">
          {children} <p className='text-2xl'>из {kpiAll}</p>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
