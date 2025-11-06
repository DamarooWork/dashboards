import { Menu } from './menu'

interface Props {
  title: string
}
export function Header({ title }: Props) {
  return (
    <header className={'flex flex-row justify-between items-center pt-1'}>
      <h1 className="text-3xl font-bold text-background shrink-0 ">{title}</h1>
      <Menu />
    </header>
  )
}
