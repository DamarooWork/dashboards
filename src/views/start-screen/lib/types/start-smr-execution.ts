export interface StartSmrExecutionItem {
  year: number
  railway_id: number
  railway_name: string
  repair_id: number // id = 0 для суммарной строки по всем видам ремонта
  repair_name: string // name = "Все" для суммарной строки по видам ремонта
  work_in_progress_cnt_plan: number // Разворот работ. Объекты план
  work_in_progress_cnt_fact: number // Разворот работ. Объекты факт
  work_in_progress_distance_plan: number // Разворот работ. Км план (3 знака после запятой)
  work_in_progress_distance_fact: number // Разворот работ. Км факт (3 знака после запятой)
  work_in_progress_perc: number // Разворот работ. %
  work_completed_cnt_plan: number // Завершенные работы. Объекты план
  work_completed_cnt_fact: number // Завершенные работы. Объекты факт
  work_completed_distance_plan: number // Завершенные работы. Км план (3 знака после запятой)
  work_completed_distance_fact: number // Завершенные работы. Км факт (3 знака после запятой)
  work_completed_perc: number // Завершенные работы. %
  pu48_cnt_plan: number // ПУ-48. Объекты план
  pu48_cnt_fact: number // ПУ-48. Объекты факт
  pu48_distance_plan: number // ПУ-48. Км план (3 знака после запятой)
  pu48_distance_fact: number // ПУ-48. Км факт (3 знака после запятой)
  pu48_perc: number // ПУ-48. %
  act_fsu_cnt_plan: number // ФСУ-5П. Объекты план
  act_fsu_cnt_fact: number // ФСУ-5П. Объекты факт
  act_fsu_distance_plan: number // ФСУ-5П. Км план (3 знака после запятой)
  act_fsu_distance_fact: number // ФСУ-5П. Км факт (3 знака после запятой)
  act_fsu_perc: number // ФСУ-5П. %
}

