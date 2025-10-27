'use client'
import { roads } from '@/shared/lib/data'
import {
  Button,
  Label,
  RadioGroup,
  RadioGroupItem,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui'
import { FilterButton } from './filter-button'
import { useState } from 'react'
const roadsFilters = [{ id: 0, name: 'Все дороги', shortName: 'Все' }].concat(
  roads
)

const yearsFilters = [
  { id: 2, value: (new Date().getFullYear() - 1).toString() },
  { id: 3, value: new Date().getFullYear().toString() },
  { id: 4, value: (new Date().getFullYear() + 1).toString() },
]
export function FiltersContent() {
  const [year, setYear] = useState<string>(yearsFilters[1].value)
  const [road, setRoad] = useState<string>(roadsFilters[0].name)
  const handleYearClick = (year: string) => {
    setYear(year)
  }
  const handleRoadClick = (road: string) => {
    setRoad(road)
  }
  return (
    <SheetContent className="max-h-screen">
      <SheetHeader>
        <SheetTitle className="text-4xl">Фильтры</SheetTitle>
      </SheetHeader>
      <div className="grid flex-1 auto-rows-min gap-2 px-4">
        <Label className="text-2xl">Год</Label>
        <div className="grid gap-3 ">
          <div className="grid  grid-cols-3 grid-flow-row gap-2">
            {yearsFilters.map((yearItem) => (
              <FilterButton
                key={yearItem.id}
                id={yearItem.id.toString()}
                label={yearItem.value.toString()}
                onClick={() => handleYearClick(yearItem.value.toString())}
                isActive={year === yearItem.value.toString()}
              />
            ))}
          </div>
        </div>
        <Label className="text-2xl">Дорога</Label>
        <div className="flex flex-col gap-1 overflow-auto max-h-[74vh]">
          {roadsFilters.map((roadItem) => (
            <FilterButton
              key={roadItem.id}
              id={roadItem.name}
              label={roadItem.name}
              onClick={() => handleRoadClick(roadItem.name)}
              isActive={road === roadItem.name}
            />
          ))}
        
        </div>
      </div>
      <SheetFooter className="-mt-3 ">
        <SheetClose asChild>
          <Button type="submit">
            Применить
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}
