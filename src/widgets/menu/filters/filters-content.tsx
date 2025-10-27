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
  { id: 1, value: (new Date().getFullYear() - 2).toString() },
  { id: 2, value: (new Date().getFullYear() - 1).toString() },
  { id: 3, value: new Date().getFullYear().toString() },
  { id: 4, value: (new Date().getFullYear() + 1).toString() },
  { id: 5, value: (new Date().getFullYear() + 2).toString() },
]
export function FiltersContent() {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-4xl">Фильтры</SheetTitle>
      </SheetHeader>
      <div className="grid flex-1 auto-rows-min gap-2 px-4">
        <Label className="text-2xl">Год</Label>
        <div className="grid gap-3 ">
          <RadioGroup
            className="grid grid-rows-3 grid-cols-3 grid-flow-col gap-2"
            defaultValue={yearsFilters
              .find(
                (year) => year.value === new Date().getFullYear().toString()
              )
              ?.id.toString()}
          >
            {yearsFilters.map((year) => (
              <RadioButton
                key={year.id}
                id={year.id.toString()}
                label={year.value.toString()}
              />
            ))}
          </RadioGroup>
        </div>
        <Label className="text-2xl">Дорога</Label>
        <RadioGroup
          className="overflow-auto max-h-[70vh]"
          defaultValue="Все дороги"
        >
          {roadsFilters.map((road) => (
            <RadioButton key={road.id} id={road.name} label={road.name} />
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
