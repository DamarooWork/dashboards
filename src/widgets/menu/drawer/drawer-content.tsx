'use client'
import { Card } from '@/shared/components'
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui'
import {
  ChartArea,
  ChartBar,
  ChartBarBig,
  ChartBarDecreasing,
  ChartColumn,
  ChartLine,
  ChartNoAxesColumnDecreasing,
  LaptopMinimalCheck,
  Menu,
} from 'lucide-react'

const dashboards = [
  {
    title: 'Дашборд 1',
    icon: <LaptopMinimalCheck className="size-20 self-center flex-1" />,
  },
  {
    title: 'Дашборд 2',
    icon: <ChartArea className="size-20 self-center flex-1" />,
  },
  {
    title: 'Дашборд 3',
    icon: <ChartBar className="size-20 self-center flex-1" />,
  },
  {
    title: 'Дашборд 4',
    icon: <ChartBarBig className="size-20 self-center flex-1" />,
  },
  {
    title: 'Дашборд 5',
    icon: <ChartBarDecreasing className="size-20 self-center flex-1" />,
  },
  {
    title: 'Дашборд 6',
    icon: <ChartColumn className="size-20 self-center flex-1" />,
  },
  {
    title: 'Дашборд 7',
    icon: <ChartLine className="size-20 self-center flex-1" />,
  },
  {
    title: 'Дашборд 8',
    icon: (
      <ChartNoAxesColumnDecreasing className="size-20 self-center flex-1" />
    ),
  },
]
export function DrawerContentComponent() {
  return (
    <DrawerContent>
      <div className="mx-auto w-full">
        <DrawerHeader>
          <DrawerTitle className="text-4xl font-bold -mt-4">Панели</DrawerTitle>
          <DrawerDescription className="text-3xl">
            Выберите панель для отображения
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-8 grid grid-cols-8 gap-4 w-full  text-center">
          {dashboards.map((dashboard) => (
            <Card
              dashboard
              key={dashboard.title}
              title={dashboard.title}
              className="flex-1"
            >
              {dashboard.icon}
            </Card>
          ))}
        </div>
      </div>
    </DrawerContent>
  )
}
