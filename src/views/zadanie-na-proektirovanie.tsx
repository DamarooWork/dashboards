'use client'
import { useState } from 'react'
import { Cards, Charts } from '@/shared/components/zadanie-na-proektirovanie'
import { Header } from '@/widgets'

export function ZadanieNaProektirovanie() {
  const [chartSwitchStatus, setChartSwitchStatus] = useState<boolean>(true)

  return (
    <section className="flex flex-col flex-1 w-full  overflow-hidden gap-12">
      <Header title="Задание на проектирование" />
      <Cards showProgressAndKpi={chartSwitchStatus} />
      <Charts
        chartSwitchStatus={chartSwitchStatus}
        setChartSwitchStatus={setChartSwitchStatus}
      />
    </section>
  )
}
