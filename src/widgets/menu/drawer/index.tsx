'use client'
import { Button, Drawer as DrawerComponent, DrawerTrigger } from '@/shared/ui'
import { DrawerContentComponent } from './drawer-content'
import {  Menu } from 'lucide-react'

export function Drawer() {
  return (
    <DrawerComponent>
      <DrawerTrigger asChild>
        <Button
          className="rounded-full size-16 p-2 shadow-lg border-foreground border-2 active:scale-90 will-change-transform transition-all duration-200"
          variant="outline"
        >
          <Menu className="size-8" />
        </Button>
      </DrawerTrigger>
      <DrawerContentComponent />
    </DrawerComponent>
  )
}
