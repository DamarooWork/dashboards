'use client'
import { Card } from '@/shared/components'
import {
  DrawerClose,
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
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const dashboards = [
  {
    title: 'Стартовый экран',
    icon: <LaptopMinimalCheck className="size-20 self-center flex-1" />,
    href: '/start-page',
  },
  {
    title: 'Сбор ИД',
    icon: <ChartArea className="size-20 self-center flex-1" />,
    href: '/sbor-id',
  },
  {
    title: 'Сбор ЗП',
    icon: <ChartBar className="size-20 self-center flex-1" />,
    href: '/zadanie-na-proektirovanie',
  },
  {
    title: 'Строительный контроль',
    icon: <ChartBarBig className="size-20 self-center flex-1" />,
    href: '/construction-supervision',
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
  const pathname = usePathname()

  return (
    <DrawerContent>
      <div className="mx-auto w-full">
        <DrawerHeader>
          <DrawerTitle className="text-4xl font-bold -mt-4">Панели</DrawerTitle>
          <DrawerDescription className="text-3xl">
            Выберите панель для отображения
          </DrawerDescription>
        </DrawerHeader>
        <div className=" px-4 pb-8 grid grid-cols-8 gap-4 w-full text-center items-stretch">
          {dashboards.map((dashboard) => (
            <DrawerClose asChild key={dashboard.title}>
              <Link href={dashboard.href ?? ''} className="h-full">
                <Card
                  dashboard
                  title={dashboard.title}
                  active={pathname === dashboard.href}
                  className="h-full"
                >
                  {dashboard.icon}
                </Card>
              </Link>
            </DrawerClose>
          ))}
        </div>
      </div>
    </DrawerContent>
  )
}
