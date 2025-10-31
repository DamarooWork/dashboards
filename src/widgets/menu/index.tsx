import { Filters } from './filters'
import { Drawer } from './drawer'

export function Menu() {
  return (
    <aside className={'flex flex-row gap-4 items-center'}>
      <Filters />
      <Drawer />
    </aside>
  )
}
