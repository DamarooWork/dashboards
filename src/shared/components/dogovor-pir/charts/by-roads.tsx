'use client'

import { roads } from '@/shared/lib/data'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js'
import datalabels from 'chartjs-plugin-datalabels'
import { Chart } from 'react-chartjs-2'
import { useDogovorPirRoadsChartHook } from '@/shared/lib/hooks'
import { dogovorPirRoadsOptions } from '@/shared/lib/chart-options'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  datalabels
)

interface Props {
  className?: string
}

export function ByRoadsChart({ className }: Props) {
  const { chartRef, chartData } = useDogovorPirRoadsChartHook()

  return (
    <section className={className}>
      <div className="w-full h-full">
        {chartData ? (
          <Chart
            ref={chartRef}
            type="bar"
            options={dogovorPirRoadsOptions}
            data={chartData}
          />
        ) : (
          <Chart
            ref={chartRef}
            type="bar"
            options={dogovorPirRoadsOptions}
            data={{
              labels: roads.map((road) => road.shortName),
              datasets: [],
            }}
          />
        )}
      </div>
    </section>
  )
}
