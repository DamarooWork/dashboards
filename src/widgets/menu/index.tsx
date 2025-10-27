import { Filters } from './filters'
import { Drawer } from './drawer'

export function Menu() {
  return (
    <aside className={'fixed bottom-4 right-2 flex flex-col gap-2'}>
      <Filters />
      <Drawer />
    </aside>
  )
}
