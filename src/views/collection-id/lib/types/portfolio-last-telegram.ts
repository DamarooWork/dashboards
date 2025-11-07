export interface PortfolioLastTelegramItem {
  portfolio_id: number
  year: number
  railway_name: string
  telegram_date: string | null
  tp_task_planned_finish: string | null
  days_since_tp_task_planned_start: number | null
  days_till_tp_task_deadline: number | null
}

