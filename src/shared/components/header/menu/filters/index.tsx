'use client'
import { Sheet, SheetTrigger } from '@/shared/ui'
import { ListFilterPlus } from 'lucide-react'
import { FiltersContent } from './filters-content'
import { initialFiltersState, useFiltersStore } from '@/shared/store'
import { MenuButton } from '../menu-button'

export function Filters() {
  const { year, road, typeOfWork } = useFiltersStore()

  const isNonBasicFilter =
    initialFiltersState.year !== year ||
    initialFiltersState.road !== road ||
    initialFiltersState.typeOfWork !== typeOfWork

  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuButton
          icon={<ListFilterPlus />}
          title="Фильтры"
          className="relative"
        >
          {isNonBasicFilter && (
            <div className="absolute -top-1 -right-1 size-3.5 bg-red-500 rounded-full border-1 border-background" />
          )}
        </MenuButton>
      </SheetTrigger>
      <FiltersContent />
    </Sheet>
  )
}
