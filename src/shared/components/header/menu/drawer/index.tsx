'use client'
import { Drawer as DrawerComponent, DrawerTrigger } from '@/shared/ui'
import { DrawerContentComponent } from './drawer-content'
import { Menu } from 'lucide-react'
import { MenuButton } from '../menu-button'

export function Drawer() {
  return (
    <DrawerComponent>
      <DrawerTrigger asChild>
        <MenuButton
          icon={<Menu />}
          title="Меню"
        />
      </DrawerTrigger>
      <DrawerContentComponent />
    </DrawerComponent>
  )
}

