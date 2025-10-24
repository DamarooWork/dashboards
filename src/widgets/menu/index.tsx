import { Filters } from './filters'
import { Drawer } from './drawer'

interface Props {
  className?: string
}
export function Menu({ className }: Props) {
  return (
    <aside className={'fixed bottom-6 right-6 flex flex-col gap-4'}>
      <Filters />
      <Drawer />
    </aside>
  )
}
