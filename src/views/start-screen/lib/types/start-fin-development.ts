export interface StartFinDevelopmentItem {
  year: number
  railway_id: number
  railway_name: string
  repair_id: number // id = 0 для суммарной строки по всем видам ремонта
  repair_name: string // name = "Все" для суммарной строки по видам ремонта
  general_plan: number // Общее освоение. План (2 знака после запятой)
  general_fact: number // Общее освоение. Факт (2 знака после запятой)
  general_delta: number // Общее освоение. Дельта (2 знака после запятой)
  general_perc: number // Общее освоение. %
  economic_plan: number // Хоз. способ. План (2 знака после запятой)
  economic_fact: number // Хоз. способ. Факт (2 знака после запятой)
  economic_delta: number // Хоз. способ. Дельта (2 знака после запятой)
  economic_perc: number // Хоз. способ. %
  other_plan: number // Сторонний подряд. План (2 знака после запятой)
  other_fact: number // Сторонний подряд. Факт (2 знака после запятой)
  other_delta: number // Сторонний подряд. Дельта (2 знака после запятой)
  other_perc: number // Сторонний подряд. %
  pir_plan: number // ПИР. План (2 знака после запятой)
  pir_fact: number // ПИР. Факт (2 знака после запятой)
  pir_delta: number // ПИР. Дельта (2 знака после запятой)
  pir_perc: number // ПИР. %
}

