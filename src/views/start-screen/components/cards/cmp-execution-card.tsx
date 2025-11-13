'use client'

import { useMemo } from 'react'
import { Card } from '@/shared/components'
import { useFilteredSmrExecution } from '@/views/start-screen/hooks'

export function CmpExecutionCard() {
  const { data: summaryData, isLoading } = useFilteredSmrExecution()

  // Если данные загружаются или отсутствуют, показываем значения по умолчанию
  const workInProgress = useMemo(() => {
    if (!summaryData) {
      return {
        cntFact: 0,
        cntPlan: 0,
        distanceFact: 0,
        distancePlan: 0,
      }
    }
    return {
      cntFact: summaryData.work_in_progress_cnt_fact,
      cntPlan: summaryData.work_in_progress_cnt_plan,
      distanceFact: summaryData.work_in_progress_distance_fact,
      distancePlan: summaryData.work_in_progress_distance_plan,
    }
  }, [summaryData])

  const workCompleted = useMemo(() => {
    if (!summaryData) {
      return {
        cntFact: 0,
        cntPlan: 0,
        distanceFact: 0,
        distancePlan: 0,
      }
    }
    return {
      cntFact: summaryData.work_completed_cnt_fact,
      cntPlan: summaryData.work_completed_cnt_plan,
      distanceFact: summaryData.work_completed_distance_fact,
      distancePlan: summaryData.work_completed_distance_plan,
    }
  }, [summaryData])

  const pu48 = useMemo(() => {
    if (!summaryData) {
      return {
        cntFact: 0,
        cntPlan: 0,
        distanceFact: 0,
        distancePlan: 0,
      }
    }
    return {
      cntFact: summaryData.pu48_cnt_fact,
      cntPlan: summaryData.pu48_cnt_plan,
      distanceFact: summaryData.pu48_distance_fact,
      distancePlan: summaryData.pu48_distance_plan,
    }
  }, [summaryData])

  const fsu5p = useMemo(() => {
    if (!summaryData) {
      return {
        cntFact: 0,
        cntPlan: 0,
        distanceFact: 0,
        distancePlan: 0,
      }
    }
    return {
      cntFact: summaryData.act_fsu_cnt_fact,
      cntPlan: summaryData.act_fsu_cnt_plan,
      distanceFact: summaryData.act_fsu_distance_fact,
      distancePlan: summaryData.act_fsu_distance_plan,
    }
  }, [summaryData])

  return (
    <Card
      className="flex flex-col justify-between"
      title="Выполнение объемов CMP"
      size="lg"
    >
      <Card
        title="Разворот работ"
        size="sm"
        footerMetrics={{
          label1: 'Объекты',
          label2: 'Километры',
          value1: workInProgress.cntFact,
          plan1: workInProgress.cntPlan,
          value2: Math.round(workInProgress.distanceFact * 1000) / 1000,
          plan2: Math.round(workInProgress.distancePlan * 1000) / 1000,
        }}
      />
      <Card
        title="Выполнение работ"
        size="sm"
        footerMetrics={{
          label1: 'Объекты',
          label2: 'Километры',
          value1: workCompleted.cntFact,
          plan1: workCompleted.cntPlan,
          value2: Math.round(workCompleted.distanceFact * 1000) / 1000,
          plan2: Math.round(workCompleted.distancePlan * 1000) / 1000,
        }}
      />
      <Card
        title="ПУ-48"
        size="sm"
        footerMetrics={{
          label1: 'Объекты',
          label2: 'Километры',
          value1: pu48.cntFact,
          plan1: pu48.cntPlan,
          value2: Math.round(pu48.distanceFact * 1000) / 1000,
          plan2: Math.round(pu48.distancePlan * 1000) / 1000,
        }}
      />
      <Card
        title="ФСУ-5П"
        size="sm"
        footerMetrics={{
          label1: 'Объекты',
          label2: 'Километры',
          value1: fsu5p.cntFact,
          plan1: fsu5p.cntPlan,
          value2: Math.round(fsu5p.distanceFact * 1000) / 1000,
          plan2: Math.round(fsu5p.distancePlan * 1000) / 1000,
        }}
      />
    </Card>
  )
}
