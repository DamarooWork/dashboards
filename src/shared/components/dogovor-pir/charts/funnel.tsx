'use client'

interface FunnelProps {
  className?: string
  limitPosl: number // Лимит посл
  limitUz: number // Лимит УЗ
  cost: number // Стоимость
}

export function Funnel({ className, limitPosl, limitUz, cost }: FunnelProps) {
  // Вычисляем проценты относительно максимального значения (limitPosl)
  const maxValue = limitPosl
  const limitPoslPercent = 100 // Верхняя секция всегда 100%
  const limitUzPercent =
    maxValue > 0 ? Math.round((limitUz / maxValue) * 100) : 0
  const costPercent = maxValue > 0 ? Math.round((cost / maxValue) * 100) : 0

  return (
    <div className={className}>
      <div className="flex flex-col h-full justify-center items-center gap-0 py-4 w-3/4 mx-auto">
        {/* Верхняя секция - Лимит посл (самая широкая) */}
        <div className="w-full relative">
          <div
            className="mx-auto h-16 bg-linear-to-b from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center gap-4 relative"
            style={{ width: '100%' }}
          >
            <span className="text-white font-semibold text-lg">Лимит после</span>
            <span className="text-white font-bold text-xl">
              {limitPoslPercent} млн
            </span>
          </div>
        </div>

        {/* Средняя секция - Лимит УЗ */}
        <div className="w-full relative">
          <div
            className="mx-auto h-16 bg-linear-to-b from-blue-400 to-blue-500 rounded-b-2xl flex items-center justify-center gap-4 relative"
            style={{ width: `${Math.max(limitUzPercent, 20)}%` }}
          >
            <span className="text-white font-semibold text-lg">Лимит УЗ</span>
            <span className="text-white font-bold text-xl">
              {limitUzPercent} млн
            </span>
          </div>
        </div>

        {/* Нижняя секция - Стоимость (самая узкая) */}
        <div className="w-full relative">
          <div
            className="mx-auto h-16 bg-linear-to-b from-blue-300 to-blue-400 rounded-b-2xl flex items-center justify-center gap-4 relative"
            style={{ width: `${Math.max(costPercent, 15)}%` }}
          >
            <span className="text-white font-semibold text-lg">Стоимость</span>
            <span className="text-white font-bold text-xl">{costPercent} млн</span>
          </div>
        </div>
      </div>
    </div>
  )
}
