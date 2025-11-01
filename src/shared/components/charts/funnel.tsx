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
   * По умолчанию: 20% для всех элементов, кроме первого (100%).
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
   * По умолчанию: 20%
   */
  defaultMinWidthPercent?: number
  /**
   * Высота каждого сегмента воронки в пикселях.
   * По умолчанию: 64px (h-16 в Tailwind)
   */
  itemHeight?: number
}

/**
 * Универсальный компонент воронки для визуализации иерархических данных.
 * Поддерживает любое количество элементов с настраиваемым форматированием.
 * Цвета применяются автоматически с градиентом от синего (сверху) к более светлым оттенкам.
 *
 * @example
 * ```tsx
 * <Funnel
 *   items={[
 *     { label: 'Лимит после', value: 100, formatValue: (v) => `${v} млн` },
 *     { label: 'Лимит ЦЗ', value: 80 },
 *     { label: 'Стоимость', value: 60 }
 *   ]}
 * />
 * ```
 */
export function Funnel({
  className,
  items,
  defaultMinWidthPercent = 20,
  itemHeight = 64,
}: FunnelProps) {
  if (!items || items.length === 0) {
    return null
  }

  // Вычисляем проценты относительно первого (максимального) значения
  const maxValue = items[0]?.value || 1
  const percentages = items.map((item, index) => {
    if (index === 0) return 100 // Первый элемент всегда 100%
    return maxValue > 0 ? Math.round((item.value / maxValue) * 100) : 0
  })

  // Цветовая палитра для градиентов (автоматически применяется)
  const colorPalette = [
    { from: '#3b82f6', to: '#2563eb' }, // blue-500 to blue-600
    { from: '#60a5fa', to: '#3b82f6' }, // blue-400 to blue-500
    { from: '#93c5fd', to: '#60a5fa' }, // blue-300 to blue-400
    { from: '#bfdbfe', to: '#93c5fd' }, // blue-200 to blue-300
    { from: '#dbeafe', to: '#bfdbfe' }, // blue-100 to blue-200
  ]

  // Получаем цвета для элемента из палитры
  const getItemColors = (index: number) => {
    return (
      colorPalette[Math.min(index, colorPalette.length - 1)] || colorPalette[0]
    )
  }

  // Форматируем значение
  const formatValue = (item: FunnelItem, percent: number) => {
    if (item.formatValue) {
      return item.formatValue(item.value, percent)
    }
    return `${item.value}`
  }

  // Вычисляем ширины для каждого элемента (в процентах)
  const widths = items.map((item, index) => {
    if (index === 0) return 100
    const percent = percentages[index]
    const minWidth =
      item.minWidthPercent ?? (index === 0 ? 100 : defaultMinWidthPercent)
    return Math.max(percent, minWidth)
  })

  return (
    <div className={className}>
      <div className="flex flex-col h-full justify-center items-center gap-0 py-6 w-3/4 mx-auto">
        {items.map((item, index) => {
          const colors = getItemColors(index)
          const isFirst = index === 0
          const isLast = index === items.length - 1

          // Ширина верхней части (для первого элемента = 100%, для остальных = ширина предыдущего)
          const topWidth = index === 0 ? 100 : widths[index - 1]
          // Ширина нижней части (текущего элемента)
          const bottomWidth = widths[index]

          // Вычисляем отступ слева для центрирования (50% - половина ширины)
          const topLeftOffset = (100 - topWidth) / 2
          const bottomLeftOffset = (100 - bottomWidth) / 2

          // Создаем clip-path для трапеции
          // Точки полигона: верх-левый, верх-правый, низ-правый, низ-левый
          const clipPath = `polygon(
            ${topLeftOffset}% 0%, 
            ${topLeftOffset + topWidth}% 0%, 
            ${bottomLeftOffset + bottomWidth}% 100%, 
            ${bottomLeftOffset}% 100%
          )`

          // Скругление только для первого элемента сверху и последнего снизу
          let borderRadius = '0'
          if (isFirst && isLast) {
            borderRadius = '1.25rem'
          } else if (isFirst) {
            borderRadius = '1.25rem 1.25rem 0 0'
          } else if (isLast) {
            borderRadius = '0 0 1.25rem 1.25rem'
          }

          return (
            <div
              key={index}
              className="w-full relative"
              style={{ height: `${itemHeight}px` }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center gap-6 "
                style={{
                  left: 0,
                  right: 0,
                  background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                  borderRadius,
                  clipPath,
                  boxShadow: `0 8px 24px -4px ${colors.from}40, 0 4px 8px -2px ${colors.to}30, inset 0 1px 0 0 rgba(255, 255, 255, 0.1)`,
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Декоративный blur эффект */}
                <div
                  className="absolute inset-0 opacity-20 blur-xl"
                  style={{
                    background: `radial-gradient(circle at center, ${colors.from}, transparent)`,
                    borderRadius,
                    clipPath,
                  }}
                />

                {/* Контент поверх blur */}
                <div className="relative z-10 flex items-center justify-center gap-6">
                  <span className="text-white font-semibold text-xl tracking-wide drop-shadow-lg">
                    {item.label}
                  </span>
                  <span
                    className="text-white font-bold text-2xl tracking-tight drop-shadow-lg"
                    style={{
                      textShadow:
                        '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    {formatValue(item, percentages[index])}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
