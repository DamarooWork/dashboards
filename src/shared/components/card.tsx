import { cn } from '../lib/utils'

type kpiResult = 'success' | 'failure' | 'neutral'
interface Props {
  className?: string
  title?: string
  children?: React.ReactNode
  kpiValue?: number
  kpiChange?: number
  kpiResult?: kpiResult
}
export function Card({
  className,
  children,
  title,
  kpiValue,
  kpiChange,
  kpiResult,
}: Props) {
  return (
    <div
      className={cn(
        className,
        'rounded-xl bg-card border border-border overflow-hidden p-3.5 shadow  min-h-42   flex flex-col  '
      )}
    >
      {title && <h3 className="font-extrabold mb-1.5 text-sm">{title}</h3>}
      {kpiValue && (
        <div className="flex items-end gap-2.5">
          <b className="text-2xl font-black">{kpiValue} </b>
          <span
            className={`text-base ${
              kpiResult === 'success'
                ? 'text-chart-2'
                : kpiResult === 'failure'
                ? 'text-chart-1'
                : 'text-[#ca8a04]'
            }`}
          >
            {kpiResult === 'success' ? (
              <span>▲ +{kpiChange}%</span>
            ) : kpiResult === 'failure' ? (
              <span>▼ +{kpiChange}%</span>
            ) : (
              <span>● </span>
            )}
          </span>
        </div>
      )}

      {children}
    </div>
  )
}
