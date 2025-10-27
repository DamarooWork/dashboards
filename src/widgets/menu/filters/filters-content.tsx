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
import { RadioButton } from './radio-button'
const roadsFilters = [{ id: 0, name: 'Все дороги', shortName: 'Все' }].concat(
  roads
)

const yearsFilters = [
  { id: 1, year: 2024 },
  { id: 2, year: 2025 },
  { id: 3, year: 2026 },
]
export function FiltersContent() {
  const onYearClick= () => {
    console.log('onYearClick')
  }
  const onRoadClick= () => {
    console.log('onRoadClick')
  }
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-4xl">Фильтр</SheetTitle>
      </SheetHeader>
      <div className="grid flex-1 auto-rows-min gap-2 px-4">
        <Label className="text-2xl">Год</Label>
        <div className="grid gap-3 ">
          <RadioGroup defaultValue={'2025'}>
            {yearsFilters.map((year) => (
              <RadioButton
                key={year.id}
                id={year.id.toString()}
                label={year.year.toString()}
                onClick={onYearClick}
              />
            ))}
          </RadioGroup>
        </div>
        <Label className="text-2xl">Дорога</Label>
        <RadioGroup defaultValue="Все дороги">
          {roadsFilters.map((road) => (
            <RadioButton key={road.id} id={road.name} label={road.name} onClick={onRoadClick} />
          ))}
        </RadioGroup>
      </div>
      {/* <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Применить</Button>
        </SheetClose>
        <SheetClose asChild>
          <Button variant="outline">Закрыть</Button>
        </SheetClose>
      </SheetFooter> */}
    </SheetContent>
  )
}
