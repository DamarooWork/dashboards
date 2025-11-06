'use client'
import { Button, Sheet, SheetTrigger } from '@/shared/ui'
import { ListFilterPlus } from 'lucide-react'
import { FiltersContent } from './filters-content'
import { initialFiltersState, useFiltersStore } from '@/shared/store'



export function Filters() {
  const { year, road, typeOfWork } = useFiltersStore()

  const isNonBasicFilter = initialFiltersState.year !== year || initialFiltersState.road !== road || initialFiltersState.typeOfWork !== typeOfWork

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="rounded-xl size-18 shadow-lg border-foreground border-2 active:scale-90 will-change-transform transition-all duration-200 relative"
          variant="outline"
        >
          <ListFilterPlus className="size-10" />
          {isNonBasicFilter && (
            <div className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full border-2 border-background" />
          )}
        </Button>
      </SheetTrigger>
      <FiltersContent />
    </Sheet>
  )
}

