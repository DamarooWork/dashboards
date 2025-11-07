export type SdCollectionStatus = 'completed' | 'overdue' | 'inwork' | null

export interface SdCollectionStatusItem {
  year: number
  railway_name: string
  repairtype_name: string
  status: SdCollectionStatus
}

