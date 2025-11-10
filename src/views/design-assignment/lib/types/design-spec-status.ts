export interface DesignSpecStatusItem {
  year: number | null
  project_id: number | null
  railway_id: number | null
  railway_name: string | null
  repairtype_id: number | null
  repairtype_name: string | null
  dsp_task_planned_start: string | null
  dsp_task_planned_finish: string | null
  dsp_task_deadline: string | null
  dsp_task_completion_date: string | null
  dsp_task_workflowstepname:
    | 'completed'
    | 'inwork'
    | 'planned'
    | 'new'
    | 'cancelled'
    | null
  cl_task_planned_start: string | null
  cl_task_planned_finish: string | null
  cl_task_deadline: string | null
  cl_task_completion_date: string | null
  cl_task_workflowstepname:
    | 'completed'
    | 'inwork'
    | 'planned'
    | 'new'
    | 'cancelled'
    | null
}
