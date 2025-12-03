'use client'

export interface FunnelItem {
  label: string
  value: number
  /**
   * Необязательная функция форматирования значения.
   * По умолчанию выводится только число.
   */
  formatValue?: (value: number, percent: number) => string
  /**
   * Минимальная ширина в процентах для данного элемента.
   * По умолчанию: 10% для всех элементов, кроме первого (100%).
   */
  minWidthPercent?: number
}

interface FunnelProps {
  className?: string
  /**
   * Массив элементов воронки. Первый элемент будет иметь ширину 100%,
   * остальные рассчитываются относительно него.
   */
  items: FunnelItem[]
  /**
   * Минимальная ширина в процентах для всех элементов (кроме первого).
   * Используется, если minWidthPercent не указан для конкретного элемента.
   * По умолчанию: 10%
   */
  defaultMinWidthPercent?: number
  /**
   * Высота каждого сегмента воронки в пикселях.
   * По умолчанию: 88px
   */
  itemHeight?: number
}

/**
 * Премиальный компонент воронки для визуализации иерархических данных.
 * Показывает вложенность значений с визуальными индикаторами потерь между уровнями.
 *
 * Особенности:
 * - Точные пропорции без искажений
 * - Визуальные индикаторы потерь между уровнями
 * - Полупрозрачные границы для показа вложенности
 * - Профессиональный корпоративный дизайн
 *
 * @example
 * ```tsx
 * <Funnel
 *   items={[
 *     { label: 'Лимит по смете', value: 100, formatValue: (v, p) => `${p} млн` },
 *     { label: 'Лимит ЦЗ', value: 60, formatValue: (v, p) => `${p} млн` },
 *     { label: 'Стоимость', value: 35, formatValue: (v, p) => `${p} млн` }
 *   ]}
 * />
 * ```
 */
export function Funnel({
  className,
  items,
  defaultMinWidthPercent = 10,
  itemHeight = 66,
}: FunnelProps) {
  if (!items || items.length === 0) {
    return null
  }

  const maxValue = items[0]?.value || 1

  const percentages = items.map((item, index) => {
    if (index === 0) return 100
    return maxValue > 0 ? (item.value / maxValue) * 100 : 0
  })

  // Корпоративная цветовая палитра
  const colorPalette = [
    {
      primary: '#1e3a8a',
      secondary: '#2563eb',
      light: '#3b82f6',
      text: '#ffffff',
      border: '#60a5fa',
    },
    {
      primary: '#2563eb',
      secondary: '#3b82f6',
      light: '#60a5fa',
      text: '#ffffff',
      border: '#93c5fd',
    },
    {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      light: '#93c5fd',
      text: '#ffffff',
      border: '#bfdbfe',
    },
    {
      primary: '#60a5fa',
      secondary: '#93c5fd',
      light: '#bfdbfe',
      text: '#1e3a8a',
      border: '#dbeafe',
    },
    {
      primary: '#93c5fd',
      secondary: '#bfdbfe',
      light: '#dbeafe',
      text: '#1e3a8a',
      border: '#eff6ff',
    },
  ]

  const getItemStyle = (index: number) => {
    return (
      colorPalette[Math.min(index, colorPalette.length - 1)] || colorPalette[0]
    )
  }

  const formatValue = (item: FunnelItem, percent: number) => {
    if (item.formatValue) {
      return item.formatValue(item.value, percent)
    }
    return `${item.value}`
  }

  const widths = items.map((item, index) => {
    if (index === 0) return 100
    const percent = percentages[index]
    const minWidth = item.minWidthPercent ?? defaultMinWidthPercent
    return Math.max(percent, minWidth)
  })

  return (
    <div className={className}>
      <div className="flex flex-col h-full justify-center items-center gap-2 py-8 px-8 w-full max-w-4xl mx-auto">
        {items.map((item, index) => {
          const style = getItemStyle(index)
          const isFirst = index === 0
          const isLast = index === items.length - 1

          const topWidth = index === 0 ? 100 : widths[index - 1]
          const bottomWidth = widths[index]

          const topLeftOffset = (100 - topWidth) / 2
          const bottomLeftOffset = (100 - bottomWidth) / 2

          const clipPath = `polygon(
            ${topLeftOffset}% 0%, 
            ${topLeftOffset + topWidth}% 0%, 
            ${bottomLeftOffset + bottomWidth}% 100%, 
            ${bottomLeftOffset}% 100%
          )`

          const difference = index > 0 ? topWidth - bottomWidth : 0

          return (
            <div key={index} className="w-full relative">
              {/* Визуальный индикатор потерь */}
              {index > 0 && difference > 2 && (
                <div
                  className="absolute -top-2 left-0 right-0 flex justify-center"
                  style={{
                    left: `${bottomLeftOffset + bottomWidth / 2}%`,
                    right: `${100 - (topLeftOffset + topWidth / 2)}%`,
                  }}
                >
                  <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
                    <span className="text-xs font-medium text-red-700">
                      -{Math.round(difference)}%
                    </span>
                  </div>
                </div>
              )}

              <div
                className="relative overflow-hidden"
                style={{ height: `${itemHeight}px` }}
              >
                {/* Основной блок */}
                <div
                  className="absolute inset-0 rounded-2xl border-2"
                  style={{
                    background: `linear-gradient(145deg, ${style.primary} 0%, ${style.secondary} 50%, ${style.light} 100%)`,
                    clipPath,
                    borderColor: `${style.border}80`,
                    boxShadow: `
                      0 8px 32px rgba(30, 58, 138, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                    `,
                  }}
                >
                  {/* Внутреннее свечение */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-20"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${style.light}, transparent)`,
                      clipPath,
                    }}
                  />

                  {/* Контент - внутри блока с clip-path */}
                  <div
                    className="absolute inset-0 flex items-center justify-center px-10"
                    style={{ clipPath }}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <span
                        className=" text-lg tracking-tight leading-tight"
                        style={{ color: style.text }}
                      >
                        {item.label}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-3xl tracking-tight leading-none"
                          style={{
                            color: style.text,
                            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          {formatValue(item, percentages[index])}
                        </span>
                        {index === 0 ? (
                          <span
                            className="text-lg"
                            style={{ color: style.text }}
                          >
                            100%
                          </span>
                        ) : (
                          <span
                            className="text-lg font-medium"
                            style={{ color: style.text }}
                          >
                            {Math.round(percentages[index])}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Декоративные углы */}
                {isFirst && (
                  <>
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
                  </>
                )}
                {isLast && (
                  <>
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
