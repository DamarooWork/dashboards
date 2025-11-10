'use client'
import { roads } from '@/shared/lib/data'
import {
  Button,
  Label,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui'
import { FilterButton } from './filter-button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useFiltersStore, initialFiltersState } from '@/shared/store'
import { useState, useEffect, useMemo, useRef } from 'react'
import { ALL_ROADS, ALL_TYPES_OF_WORK, PAGES } from '@/shared/lib/const'
const roadsFilters = [{ id: 0, name: ALL_ROADS, shortName: ALL_ROADS }].concat(
  roads
)

const yearsFilters = [
  { id: 2, value: (new Date().getFullYear() - 1).toString() },
  { id: 3, value: new Date().getFullYear().toString() },
  { id: 4, value: (new Date().getFullYear() + 1).toString() },
]
const typesOfWorkFilters = [
  { id: 1, name: ALL_TYPES_OF_WORK },
  { id: 2, name: 'КРН' },
  { id: 3, name: 'КРС' },
  { id: 4, name: 'РС' },
  { id: 5, name: 'РП' },
]
export function FiltersContent() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    year: storeYear,
    road: storeRoad,
    typeOfWork: storeTypeOfWork,
    applyFilters,
    resetFilters,
  } = useFiltersStore()

  // Находим текущую страницу по pathname
  const currentPage = useMemo(
    () => PAGES.find((page) => page.link === pathname),
    [pathname]
  )

  // Определяем, какие фильтры показывать на основе конфигурации страницы
  const showYearsFilter = currentPage?.filters.years ?? false
  const showTypesOfWorkFilter = currentPage?.filters.typesOfWork ?? false
  const showRoadsFilter = currentPage?.filters.roads ?? false

  // Флаг для отслеживания, что мы сами обновляем URL (чтобы избежать циклов)
  const isUpdatingUrlRef = useRef(false)

  // Синхронизация store с searchParams при изменении URL
  useEffect(() => {
    if (isUpdatingUrlRef.current) {
      isUpdatingUrlRef.current = false
      return
    }

    const yearParam = searchParams.get('year')
    const roadParam = searchParams.get('road')
    const typeOfWorkParam = searchParams.get('typeOfWork')

    // Если есть параметры в URL и они отличаются от store, обновляем store
    if (
      (yearParam && yearParam !== storeYear) ||
      (roadParam && roadParam !== storeRoad) ||
      (typeOfWorkParam && typeOfWorkParam !== storeTypeOfWork)
    ) {
      applyFilters(
        yearParam || storeYear,
        roadParam || storeRoad,
        typeOfWorkParam || storeTypeOfWork
      )
    }
  }, [searchParams, storeYear, storeRoad, storeTypeOfWork, applyFilters])

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

    // Обновляем searchParams
    isUpdatingUrlRef.current = true
    const params = new URLSearchParams(searchParams.toString())
    params.set('year', localYear)
    params.set('road', localRoad)
    params.set('typeOfWork', localTypeOfWork)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleCancel = () => {
    // Сброс локального состояния к значениям из store
    setLocalYear(storeYear)
    setLocalRoad(storeRoad)
    setLocalTypeOfWork(storeTypeOfWork)
  }

  // Проверка, являются ли фильтры стандартными
  const areFiltersDefault = useMemo(() => {
    return (
      storeYear === initialFiltersState.year &&
      storeRoad === initialFiltersState.road &&
      storeTypeOfWork === initialFiltersState.typeOfWork
    )
  }, [storeYear, storeRoad, storeTypeOfWork])

  const handleReset = () => {
    resetFilters()
    // Обновляем локальное состояние к стандартным значениям
    setLocalYear(initialFiltersState.year)
    setLocalRoad(initialFiltersState.road)
    setLocalTypeOfWork(initialFiltersState.typeOfWork)

    // Очищаем searchParams
    isUpdatingUrlRef.current = true
    router.replace(pathname, { scroll: false })
  }
  return (
    <SheetContent
      className="flex flex-col"
      onInteractOutside={handleCancel}
      onEscapeKeyDown={handleCancel}
    >
      <SheetHeader>
        <SheetTitle className="text-4xl">Фильтры</SheetTitle>
        <SheetDescription className="sr-only">
          Выберите параметры фильтрации для отображения данных
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col flex-1 gap-2 px-4 overflow-hidden">
        {showYearsFilter && (
          <>
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
          </>
        )}

        {showTypesOfWorkFilter && (
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

        {showRoadsFilter && (
          <>
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
          </>
        )}
      </div>
      <SheetFooter className="-mt-3 ">
        <SheetClose asChild>
          <Button type="submit" onClick={handleApply}>
            Применить
          </Button>
        </SheetClose>
        {!areFiltersDefault && (
          <SheetClose asChild>
            <Button type="button" variant="destructive" onClick={handleReset}>
              Сбросить фильтры
            </Button>
          </SheetClose>
        )}
      </SheetFooter>
    </SheetContent>
  )
}
