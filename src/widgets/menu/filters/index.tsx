import { Button, Sheet, SheetTrigger } from '@/shared/ui'
import { ListFilterPlus } from 'lucide-react'
import { FiltersContent } from './filters-content'
export function Filters() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="rounded-full size-16 p-2 shadow-lg border-foreground border-2 active:scale-90 will-change-transform transition-all duration-200"
          variant="outline"
        >
          <ListFilterPlus className="size-8" />
        </Button>
      </SheetTrigger>
      <FiltersContent />
    </Sheet>
  )
}
