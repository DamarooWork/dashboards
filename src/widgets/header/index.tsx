import { Menu } from '@/widgets'

interface Props {
  title: string
}
export function Header({ title }: Props) {
  return (
    <header className={'flex flex-row justify-between items-center'}>
      <h1 className="text-3xl font-bold text-background shrink-0 ">{title}</h1>
      <Menu />
    </header>
  )
}
