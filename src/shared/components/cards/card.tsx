import { cn } from '@/shared/lib/utils'
import { Progress } from '@/shared/ui'

interface FooterMetrics {
  label1: string
  label2: string
  value1: number
  plan1: number
  value2: number
  plan2?: number
}

interface CardProps {
  className?: string
  title?: string
  children?: React.ReactNode
  value?: number | string
  total?: number
  size?: 'sm' | 'md' | 'lg'
  footerMetrics?: FooterMetrics
  active?: boolean
  dashboard?: boolean
}

export function Card({
  className,
  children,
  title,
  value,
  total,
  size = 'md',
  footerMetrics,
  active = false,
  dashboard = false,
}: CardProps) {
  const hasFooterMetrics = footerMetrics?.label1

  return (
    <div
      className={cn(
        'rounded-xl bg-card border border-border overflow-hidden flex flex-col shadow-md',
        'px-8 py-2 min-h-30',
        size === 'sm' && 'px-4 min-h-24 shadow-none',
        size === 'lg' && 'h-full',

        active &&
          'ring-2 ring-primary bg-primary/10 active:scale-95 will-change-transform transition-all duration-200 h-full',
        className
      )}
    >
      {title && (
        <h3
          className={cn(
            'font-semibold pb-2 -mx-3 px-3 shrink-0',
            size === 'sm' && 'text-lg',
            size === 'md' && 'text-2xl',
            size === 'lg' && 'text-3xl',
            dashboard && 'min-h-16'
          )}
        >
          {title}
        </h3>
      )}

      {value !== undefined && value !== null && (
        <div className="w-full flex-1 pb-2">
          <p className="text-5xl text-center">{value}</p>
        </div>
      )}

      {total ? (
        <div className="flex flex-row justify-between items-center gap-4">
          {children}
          <p className="text-2xl">из {total}</p>
        </div>
      ) : (
        children
      )}

      {hasFooterMetrics && (
        <div className="flex flex-row justify-between gap-4 bg-foreground/5 rounded-b-md -mx-4 px-4 -mb-2 py-2">
          <div className="flex flex-row gap-4 flex-1">
            <div className="flex flex-col items-center">
              <p className="text-2xl">{footerMetrics.label1}</p>
              <p className="text-2xl">
                {footerMetrics.value1}/{footerMetrics.plan1}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl line-clamp-1">{footerMetrics.label2}</p>
              <p className="text-2xl line-clamp-1">
                {footerMetrics.value2}
                {footerMetrics.plan2 && ` / ${footerMetrics.plan2}`}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center basis-[40%] w-full self-end -mb-1">
            <Progress
              value={Math.round(
                (footerMetrics.value1 / footerMetrics.plan1) * 100
              )}
              className="h-4"
            />
            <span className="text-2xl">
              {Math.round((footerMetrics.value1 / footerMetrics.plan1) * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
