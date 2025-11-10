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
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { PAGES, PageConfig } from '@/shared/lib/const/pages'

// Класс для всех иконок в drawer
const iconClassName = 'size-16 self-center flex-1'

// Маппинг иконок для страниц
const pageIcons: Record<string, React.ReactNode> = {
  'start-screen': <LaptopMinimalCheck className={iconClassName} />,
  'collection-id': <ChartArea className={iconClassName} />,
  'design-assignment': <ChartBar className={iconClassName} />,
  'construction-supervision': <ChartBarBig className={iconClassName} />,
  'checking-smet-pir': <ChartBarDecreasing className={iconClassName} />,
  'dashboard-6': <ChartColumn className={iconClassName} />,
  'dashboard-7': <ChartLine className={iconClassName} />,
  'contract-pir': <ChartNoAxesColumnDecreasing className={iconClassName} />,
}

export function DrawerContentComponent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Функция для формирования href с сохранением searchParams
  const getHrefWithParams = (link: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const paramsString = params.toString()
    return paramsString ? `${link}?${paramsString}` : link
  }

  return (
    <DrawerContent>
      <div className="mx-auto w-full">
        <DrawerHeader>
          <DrawerTitle className="text-4xl -mt-8">Панели</DrawerTitle>
          <DrawerDescription className="text-3xl">
            Выберите панель для отображения
          </DrawerDescription>
        </DrawerHeader>
        <div className=" px-4 pb-8 grid grid-cols-8 gap-4 w-full text-center items-stretch">
          {PAGES.map((page: PageConfig) => (
            <DrawerClose asChild key={page.id}>
              <Link href={getHrefWithParams(page.link)} className="h-full">
                <Card
                  dashboard
                  title={page.title}
                  active={pathname === page.link}
                  className="h-full"
                >
                  {pageIcons[page.name] || (
                    <ChartNoAxesColumnDecreasing className={iconClassName} />
                  )}
                </Card>
              </Link>
            </DrawerClose>
          ))}
        </div>
      </div>
    </DrawerContent>
  )
}
