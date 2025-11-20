'use client'

import { Card, Loading, Error } from '@/shared/components'
import { useBuildControlData } from '../../hooks/use-build-control-data'
import { useMemo } from 'react'

export function Cards() {
  const { data, isLoading, isFetching, error, refetch } = useBuildControlData()

  // Вычисляем суммы для карточек
  const cardsData = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return {
        zamechaniyVijavlenno: 0,
        zamechaniyUstraneno: 0,
        predpisaniyVidano: 0,
        predpisaniyUstraneno: 0,
      }
    }

    // Суммируем данные по всем записям
    const totals = data.reduce(
      (acc, item) => {
        // Используем точные названия полей из API
        acc.zamechaniyVijavlenno += Number(item.remark_quantity || 0)
        acc.zamechaniyUstraneno += Number(item.conf_remark_quantity || 0)
        acc.predpisaniyVidano += Number(item.instruction_quantity || 0)
        acc.predpisaniyUstraneno += Number(item.compl_instruction_quantity || 0)
        return acc
      },
      {
        zamechaniyVijavlenno: 0,
        zamechaniyUstraneno: 0,
        predpisaniyVidano: 0,
        predpisaniyUstraneno: 0,
      }
    )

    return totals
  }, [data])

  if (isLoading) {
    return (
      <section className="grid grid-cols-4 gap-12 shrink-0">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} title="">
            <Loading />
          </Card>
        ))}
      </section>
    )
  }

  if (error) {
    return (
      <section className="grid grid-cols-4 gap-12 shrink-0">
        <div className="col-span-4">
          <Error onRetry={() => refetch()} />
        </div>
      </section>
    )
  }

  return (
    <section className="grid grid-cols-4 gap-12 shrink-0">
      <Card title="Замечаний выявлено" value={cardsData.zamechaniyVijavlenno} />
      <Card title="Замечаний устранено" value={cardsData.zamechaniyUstraneno} />
      <Card title="Предписаний выдано" value={cardsData.predpisaniyVidano} />
      <Card title="Предписаний устранено" value={cardsData.predpisaniyUstraneno} />
    </section>
  )
}

