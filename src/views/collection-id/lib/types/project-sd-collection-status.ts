export type CollectionStatus =
  | 'none'
  | 'partial'
  | 'near_completion'
  | 'complete'
  | 'provided'

export interface ProjectSdCollectionStatusItem {
  year: number
  railway_name: string
  repairtype_name: string
  status: CollectionStatus
}

export const STATUS_MAPPING: Record<CollectionStatus, string> = {
  none: 'Нет',
  partial: 'Частично',
  near_completion: 'Почти',
  complete: 'Полный',
  provided: 'Передано',
}

