'use client'

import { useMemo } from 'react'
import { Card } from '@/shared/components'
import { useFilteredFinDevelopment } from '@/views/start-screen/hooks'

export function FinDevelopmentCard() {
  const { data: summaryData, isLoading } = useFilteredFinDevelopment()

  // Если данные загружаются или отсутствуют, показываем значения по умолчанию
  const totalDevelopment = useMemo(() => {
    if (!summaryData) {
      return {
        fact: 0,
        plan: 0,
        delta: 0,
      }
    }
    return {
      fact: summaryData.general_fact,
      plan: summaryData.general_plan,
      delta: summaryData.general_delta,
    }
  }, [summaryData])

  const ownMethod = useMemo(() => {
    if (!summaryData) {
      return {
        fact: 0,
        plan: 0,
        delta: 0,
      }
    }
    return {
      fact: summaryData.economic_fact,
      plan: summaryData.economic_plan,
      delta: summaryData.economic_delta,
    }
  }, [summaryData])

  const thirdParty = useMemo(() => {
    if (!summaryData) {
      return {
        fact: 0,
        plan: 0,
        delta: 0,
      }
    }
    return {
      fact: summaryData.other_fact,
      plan: summaryData.other_plan,
      delta: summaryData.other_delta,
    }
  }, [summaryData])

  const pir = useMemo(() => {
    if (!summaryData) {
      return {
        fact: 0,
        plan: 0,
        delta: 0,
      }
    }
    return {
      fact: summaryData.pir_fact,
      plan: summaryData.pir_plan,
      delta: summaryData.pir_delta,
    }
  }, [summaryData])

  return (
    <Card
      className="flex flex-col justify-between"
      title="Финансовое освоение"
      size="lg"
    >
      <Card
        title="Общее освоение"
        size="sm"
        footerMetrics={{
          label1: 'Млн. руб.',
          label2: 'Отклонение',
          value1: Math.round(totalDevelopment.fact * 100) / 100,
          plan1: Math.round(totalDevelopment.plan * 100) / 100,
          value2: Math.round(totalDevelopment.delta * 100) / 100,
        }}
      />
      <Card
        title="Хоз. способ"
        size="sm"
        footerMetrics={{
          label1: 'Млн. руб.',
          label2: 'Отклонение',
          value1: Math.round(ownMethod.fact * 100) / 100,
          plan1: Math.round(ownMethod.plan * 100) / 100,
          value2: Math.round(ownMethod.delta * 100) / 100,
        }}
      />
      <Card
        title="Сторонний подряд"
        size="sm"
        footerMetrics={{
          label1: 'Млн. руб.',
          label2: 'Отклонение',
          value1: Math.round(thirdParty.fact * 100) / 100,
          plan1: Math.round(thirdParty.plan * 100) / 100,
          value2: Math.round(thirdParty.delta * 100) / 100,
        }}
      />
      <Card
        title="ПИР"
        size="sm"
        footerMetrics={{
          label1: 'Млн. руб.',
          label2: 'Отклонение',
          value1: Math.round(pir.fact * 100) / 100,
          plan1: Math.round(pir.plan * 100) / 100,
          value2: Math.round(pir.delta * 100) / 100,
        }}
      />
    </Card>
  )
}
