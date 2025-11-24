'use client'

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
import { useUstraneniyaZamechaniyChartHook } from '../../hooks'
import { ustraneniyaZamechaniyOptions } from '../../chart-options'

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

export function ChartUstraneniyaZamechaniy() {
  const { chartRef, chartData } = useUstraneniyaZamechaniyChartHook()

  return (
    <div className="w-full h-full ">
      {chartData ? (
        <Chart
          ref={chartRef}
          type="bar"
          options={ustraneniyaZamechaniyOptions}
          data={chartData}
        />
      ) : (
        <Chart
          ref={chartRef}
          type="bar"
          options={ustraneniyaZamechaniyOptions}
          data={{
            labels: [],
            datasets: [],
          }}
        />
      )}
    </div>
  )
}
