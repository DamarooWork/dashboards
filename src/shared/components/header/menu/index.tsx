'use client'
import { useEffect } from 'react'
import { Filters } from './filters'
import { Drawer } from './drawer'
import { Switch } from '@/shared/ui'
import { useChartSwitchStore } from '@/shared/store'
import { usePathname } from 'next/navigation'
import { PAGES } from '@/shared/lib/const'

export function Menu() {
  const { chartSwitchStatus, toggleSwitch, setSwitchStatus } =
    useChartSwitchStore()
  const pathname = usePathname()
  const showSwitch = PAGES.find((page) => page.link === pathname)?.showSwitch
  useEffect(() => {
    setSwitchStatus(false)
  }, [pathname])

  return (
    <aside className={'flex flex-row gap-4 items-center'}>
      {showSwitch && (
        <Switch
          checked={chartSwitchStatus}
          onCheckedChange={toggleSwitch}
          className="relative"
        >
          Switch
        </Switch>
      )}
      <Filters />
      <Drawer />
    </aside>
  )
}
