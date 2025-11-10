'use client'
import { useEffect, useRef } from 'react'
import { Filters } from './filters'
import { Drawer } from './drawer'
import { PrintButton } from './print'
import { Switch } from '@/shared/ui'
import { useChartSwitchStore } from '@/shared/store'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PAGES } from '@/shared/lib/const'

export function Menu() {
  const { chartSwitchStatus, setSwitchStatus } = useChartSwitchStore()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const showSwitch = PAGES.find((page) => page.link === pathname)?.showSwitch

  // Флаг для отслеживания, что мы сами обновляем URL (чтобы избежать циклов)
  const isUpdatingUrlRef = useRef(false)

  // Синхронизация store с searchParams при изменении URL
  useEffect(() => {
    if (isUpdatingUrlRef.current) {
      isUpdatingUrlRef.current = false
      return
    }
  }, [])

  // Сброс switch при изменении pathname
  useEffect(() => {
    setSwitchStatus(false)
    // Обновляем URL, убирая параметр switch
    isUpdatingUrlRef.current = true
    const params = new URLSearchParams(searchParams.toString())
    params.delete('switch')
    const paramsString = params.toString()
    router.replace(paramsString ? `${pathname}?${paramsString}` : pathname, {
      scroll: false,
    })
  }, [pathname])

  // Обработчик изменения switch
  const handleSwitchChange = (checked: boolean) => {
    setSwitchStatus(checked)
  }

  return (
    <aside className={'flex flex-row gap-4 items-center'}>
      {showSwitch && (
        <Switch
          checked={chartSwitchStatus}
          onCheckedChange={handleSwitchChange}
          className="relative"
        >
          Switch
        </Switch>
      )}
      <PrintButton />
      <Filters />
      <Drawer />
    </aside>
  )
}
