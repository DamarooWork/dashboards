'use client'
import { useEffect } from 'react'
import { Filters } from './filters'
import { Drawer } from './drawer'
import { Switch } from '@/shared/ui'
import { useChartSwitchStore } from '@/shared/store'
import { usePathname } from 'next/navigation'

// Список страниц, где Switch не должен отображаться
const PAGES_WITHOUT_SWITCH = [
  '/start-page',
  '/proverka-smet-pir',
  '/dashboard-6',
  '/dashboard-7',
]

export function Menu() {
  const { chartSwitchStatus, toggleSwitch, setSwitchStatus } =
    useChartSwitchStore()
  const pathname = usePathname()
  const shouldShowSwitch = !PAGES_WITHOUT_SWITCH.includes(pathname)

  useEffect(() => {
    setSwitchStatus(false)
  }, [pathname])

  return (
    <aside className={'flex flex-row gap-4 items-center'}>
      {shouldShowSwitch && (
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
