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
  startPage?:{
    title1: string
    title2: string
    value1: number
    plan1: number
    value2: number
    plan2: number
  }
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
  startPage = {
    title1: '',
    title2: '',
    value1: 0,
    plan1: 0,
    value2: 0,
    plan2: 0,
  }
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
      {startPage.title1 && (
        <div className="flex flex-row justify-between items-center gap-4">
         <div>
          <div className='flex flex-row gap-2 items-center'>
            <p className="text-2xl">{startPage.title1}</p>
            <p className="text-2xl">{startPage.title2}</p>
         </div>
         <div className='flex flex-row justify-between'>
            <p className="text-2xl">{startPage.value1}/{startPage.plan1}</p>
            <p className="text-2xl">{startPage.value2}/{startPage.plan2}</p>
         </div>
        </div>  </div>
      )}
    </div>
  )
}
