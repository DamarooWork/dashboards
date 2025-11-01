/**
 * Константы для значений фильтров "Все"
 */
export const ALL_FILTERS_VALUES = new Map<string, string>([
  ['road', 'Все дороги'],
  ['typeOfWork', 'Все'],
])

/**
 * Получить значение "Все" для указанного типа фильтра
 */
export const getAllFilterValue = (filterType: string): string | undefined => {
  return ALL_FILTERS_VALUES.get(filterType)
}

/**
 * Проверить, является ли значение значением "Все" для указанного типа фильтра
 */
export const isAllFilterValue = (
  value: string,
  filterType: string
): boolean => {
  return value === ALL_FILTERS_VALUES.get(filterType)
}

// Экспорт конкретных значений для удобства
export const ALL_ROADS = 'Все дороги'
export const ALL_TYPES_OF_WORK = 'Все'
