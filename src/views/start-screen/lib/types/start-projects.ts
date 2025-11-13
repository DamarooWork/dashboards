export interface StartProjectsItem {
  year: number
  railway_id: number
  railway_name: string
  repair_id: number // id = 0 для суммарной строки по всем видам ремонта
  repair_name: string // name = "Все" для суммарной строки по видам ремонта
  project_cnt: number // объекты
  distance: number // км (3 знака после запятой)
  turnout_count: number // СП (1 знак после запятой)
}
