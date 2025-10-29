'use client'
import { roads } from '@/shared/lib/data'
import {
  Button,
  Label,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui'
import { FilterButton } from './filter-button'
import { usePathname } from 'next/navigation'
import { useFiltersStore } from '@/shared/store'
import { useState, useEffect } from 'react'
const roadsFilters = [{ id: 0, name: 'Все дороги', shortName: 'Все' }].concat(
  roads
)

const yearsFilters = [
  { id: 2, value: (new Date().getFullYear() - 1).toString() },
  { id: 3, value: new Date().getFullYear().toString() },
  { id: 4, value: (new Date().getFullYear() + 1).toString() },
]
const typesOfWorkFilters = [
  { id: 1, name: 'Все' },
  { id: 2, name: 'КРН' },
  { id: 3, name: 'КРС' },
  { id: 4, name: 'РС' },
  { id: 5, name: 'РП' },
]
export function FiltersContent() {
  const pathname = usePathname()
  const {
    year: storeYear,
    road: storeRoad,
    typeOfWork: storeTypeOfWork,
    applyFilters,
  } = useFiltersStore()

  // Локальное состояние для временных изменений
  const [localYear, setLocalYear] = useState(storeYear)
  const [localRoad, setLocalRoad] = useState(storeRoad)
  const [localTypeOfWork, setLocalTypeOfWork] = useState(storeTypeOfWork)

  // Синхронизация с Zustand при изменении значений в store
  useEffect(() => {
    setLocalYear(storeYear)
    setLocalRoad(storeRoad)
    setLocalTypeOfWork(storeTypeOfWork)
  }, [storeYear, storeRoad, storeTypeOfWork])

  const handleYearClick = (year: string) => {
    setLocalYear(year)
  }
  const handleRoadClick = (road: string) => {
    setLocalRoad(road)
  }
  const handleTypeOfWorkClick = (typeOfWork: string) => {
    setLocalTypeOfWork(typeOfWork)
  }

  const handleApply = () => {
    applyFilters(localYear, localRoad, localTypeOfWork)
  }

  const handleCancel = () => {
    // Сброс локального состояния к значениям из store
    setLocalYear(storeYear)
    setLocalRoad(storeRoad)
    setLocalTypeOfWork(storeTypeOfWork)
  }
  return (
    <SheetContent
      className="flex flex-col"
      onInteractOutside={handleCancel}
      onEscapeKeyDown={handleCancel}
    >
      <SheetHeader>
        <SheetTitle className="text-4xl">Фильтры</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col flex-1 gap-2 px-4 overflow-hidden">
        <Label className="text-2xl">Год</Label>
        <div className="grid gap-3 ">
          <div className="grid  grid-cols-3 grid-flow-row gap-2">
            {yearsFilters.map((yearItem) => (
              <FilterButton
                key={yearItem.id}
                id={yearItem.id.toString()}
                label={yearItem.value.toString()}
                onClick={() => handleYearClick(yearItem.value.toString())}
                isActive={localYear === yearItem.value.toString()}
              />
            ))}
          </div>
        </div>

        {pathname === '/sbor-id' && (
          <>
            <Label className="text-2xl">Вид работ</Label>
            <div className="grid gap-3 ">
              <div className="grid  grid-cols-5 grid-flow-row gap-2">
                {typesOfWorkFilters.map((typeOfWorkItem) => (
                  <FilterButton
                    key={typeOfWorkItem.id}
                    id={typeOfWorkItem.id.toString()}
                    label={typeOfWorkItem.name}
                    onClick={() => handleTypeOfWorkClick(typeOfWorkItem.name)}
                    isActive={localTypeOfWork === typeOfWorkItem.name}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        <Label className="text-2xl">Дорога</Label>
        <div className="flex flex-col gap-1 overflow-y-auto flex-1 min-h-0 pr-2 scrollbar">
          {roadsFilters.map((roadItem) => (
            <FilterButton
              key={roadItem.id}
              id={roadItem.name}
              label={roadItem.name}
              onClick={() => handleRoadClick(roadItem.name)}
              isActive={localRoad === roadItem.name}
            />
          ))}
        </div>
      </div>
      <SheetFooter className="-mt-3 ">
        <SheetClose asChild>
          <Button type="submit" onClick={handleApply}>
            Применить
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}
