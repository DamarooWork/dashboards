import { cn } from '@/shared/lib/utils'

interface Props {
  className?: string
  title?: string
  children?: React.ReactNode
  kpiValue?: number
  kpiAll?: number
  dashboard?: boolean
  active?: boolean
  size?: 'sm' | 'md' | 'lg'
}
export function Card({
  className,
  children,
  title,
  kpiValue,
  kpiAll,
  dashboard,
  active,
  size = 'md',
}: Props) {
  return (
    <div
      className={cn(
        'rounded-xl bg-card border border-border overflow-hidden px-8 py-2 shadow-md min-h-30 flex flex-col shadow-primary  ',
        dashboard &&
          'active:scale-95 will-change-transform transition-all duration-200',
        active && 'ring-2 ring-primary bg-primary/10',
        size === 'sm' && 'px-4 min-h-24 shadow-none',
        size === 'lg' && 'h-full',
        className
      )}
    >
      {title && (
        <h3
          className={cn(
            'font-semibold  pb-2 -mx-3 px-3 shrink-0',
            size === 'sm' && 'text-lg',
            size === 'md' && 'text-2xl',
            size === 'lg' && 'text-3xl'
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
          {children} <p className="text-2xl">из {kpiAll}</p>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
