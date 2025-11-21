/**
 * Порядок отображения дорог на графиках
 * Используется для сортировки дорог во всех графиках
 */
export const ROAD_ORDER = [
  'ОКТ',
  'КЛНГ',
  'МОСК',
  'ГОРЬК',
  'СЕВ',
  'С-КАВ',
  'Ю-ВОСТ',
  'ПРИВ',
  'КБШ',
  'СВЕРД',
  'Ю-УР',
  'З-СИБ',
  'КРАС',
  'В-СИБ',
  'ЗАБ',
  'ДВОСТ',
] as const

/**
 * Сортирует массив дорог согласно заданному порядку
 * @param roads - массив дорог для сортировки
 * @returns отсортированный массив дорог
 */
export function sortRoadsByOrder<T extends { shortName: string }>(
  roads: T[]
): T[] {
  const orderMap = new Map<string, number>(
    ROAD_ORDER.map((shortName, index) => [shortName, index])
  )

  return [...roads].sort((a, b) => {
    const indexA = orderMap.get(a.shortName) ?? Infinity
    const indexB = orderMap.get(b.shortName) ?? Infinity
    return indexA - indexB
  })
}

