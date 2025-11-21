import { sortRoadsByOrder } from './road-order'

export const roads = [
  { id: 1, name: 'Восточно-Сибирская', shortName: 'В-СИБ' },
  { id: 2, name: 'Горьковская', shortName: 'ГОРЬК' },
  { id: 3, name: 'Дальневосточная', shortName: 'ДВОСТ' },
  { id: 4, name: 'Забайкальская', shortName: 'ЗАБ' },
  { id: 5, name: 'Западно-Сибирская', shortName: 'З-СИБ' },
  { id: 6, name: 'Калининградская', shortName: 'КЛНГ' },
  { id: 7, name: 'Красноярская', shortName: 'КРАС' },
  { id: 8, name: 'Куйбышевская', shortName: 'КБШ' },
  { id: 9, name: 'Московская', shortName: 'МОСК' },
  { id: 10, name: 'Октябрьская', shortName: 'ОКТ' },
  { id: 11, name: 'Приволжская', shortName: 'ПРИВ' },
  { id: 12, name: 'Свердловская', shortName: 'СВЕРД' },
  { id: 13, name: 'Северная', shortName: 'СЕВ' },
  { id: 14, name: 'Северо-Кавказская', shortName: 'С-КАВ' },
  { id: 15, name: 'Юго-Восточная', shortName: 'Ю-ВОСТ' },
  { id: 16, name: 'Южно-Уральская', shortName: 'Ю-УР' },
]

/**
 * Дороги, отсортированные в порядке для отображения на графиках
 */
export const sortedRoads = sortRoadsByOrder(roads)
