import { useRef } from 'react'
import { Button, Label, RadioGroupItem } from '@/shared/ui'

interface Props {
  className?: string
  id: string
  label: string
  onClick?: () => void
  isActive?: boolean
}
export function FilterButton({
  className,
  id,
  label,
  onClick,
  isActive,
}: Props) {
  return (
    <Button
      className={`border-2 text-xl transition-all ${
        isActive
          ? 'border-fill/50  bg-fill/50 text-foreground hover:bg-fill/60 shadow-md active:bg-fill/40'
          : 'border-foreground/50  hover:bg-foreground/5 active:bg-foreground/20'
      } ${className || ''}`}
      variant={isActive ? 'default' : 'outline'}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
