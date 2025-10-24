'use client'

import { Card } from '@/shared/components/card'
import { Chart as ChartJS, ArcElement, Tooltip, plugins } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip)
export function Cards() {
  return (
    <div className="grid grid-cols-5 gap-4 mt-4 max-h-42">
      <Card title="Объекты">
        <div className=" flex-1 overflow-hidden self-center">
          <Doughnut
            className=""
            data={{
              labels: ['Серверы', 'Каналы', 'Участники', 'Сообщения', ''],
              datasets: [
                {
                  data: [10, 20, 30, 40, 40],
                  backgroundColor: [
                    'oklch(0.488 0.243 264.376)',
                    'oklch(0.696 0.17 162.48)',
                    ' oklch(0.769 0.188 70.08)',
                    'oklch(0.627 0.265 303.9)',
                    'grey',
                  ],
                  hoverOffset: 1,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </Card>
      <Card title="Телеграмма ИД">
        <div className="text-muted-foreground text-sm">
          <p>Отправлена: 12.01.2026</p>
          <p>
            Предоставить до: <b>25.01.2026</b>
          </p>
          <p>Прошло дней:14 · До дедлайна: 9</p>
        </div>
      </Card>
      <Card
        title="Полный комплект"
        kpiValue={34}
        kpiChange={6}
        kpiResult="success"
      >
        <div>
          <p className="text-muted-foreground text-sm">68% из 62 объектов</p>
        </div>
      </Card>
      <Card
        title="Дата приближается"
        kpiValue={18}
        kpiChange={0}
        kpiResult="neutral"
      >
        <p className="text-muted-foreground text-sm">29% из 62 объектов</p>
      </Card>
      <Card title="Дата прошла" kpiValue={5} kpiChange={3} kpiResult="failure">
        <p className="text-muted-foreground text-sm">8% из 62 объектов</p>
      </Card>
    </div>
  )
}
