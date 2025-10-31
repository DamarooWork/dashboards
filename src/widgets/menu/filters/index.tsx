import { Button, Sheet, SheetTrigger } from '@/shared/ui'
import { ListFilterPlus } from 'lucide-react'
import { FiltersContent } from './filters-content'
export function Filters() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="rounded-xl size-18 shadow-lg border-foreground border-2 active:scale-90 will-change-transform transition-all duration-200"
          variant="outline"
        >
          <ListFilterPlus className="size-10" />
        </Button>
      </SheetTrigger>
      <FiltersContent />
    </Sheet>
  )
}
