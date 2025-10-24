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
export function FiltersContent() {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-4xl">Фильтр</SheetTitle>
      </SheetHeader>
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <Label className="text-2xl">Год</Label>
        <div className="grid gap-3">
          <RadioGroup defaultValue={'2025'}>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="2023" id="r1" />
              <Label htmlFor="r1">2023</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="2024" id="r2" />
              <Label htmlFor="r2">2024</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="2025" id="r3" />
              <Label htmlFor="r3">2025</Label>
            </div>
          </RadioGroup>
        </div>
        <Label className="text-2xl">Дорога</Label>
        <div className="grid gap-3">
          <RadioGroup defaultValue="all">
            <div className="flex items-center gap-3">
              <RadioGroupItem value={'all'} id="all" />
              <Label htmlFor="all">{'Все дороги'}</Label>
            </div>
            {roads.map((road) => (
              <div className="flex items-center gap-3 " key={road}>
                <RadioGroupItem value={road} id={road} />
                <Label htmlFor={road}>{road}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Применить</Button>
        </SheetClose>
        <SheetClose asChild>
          <Button variant="outline">Закрыть</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}
