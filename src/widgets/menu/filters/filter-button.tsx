
import { Button } from '@/shared/ui'

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
          ? 'border-primary  bg-primary hover:bg-primary/90   active:bg-primary/80 text-background'
          : 'border-foreground/50  hover:bg-foreground/10   active:bg-foreground/20'
      } ${className || ''}`}
      variant={isActive ? 'default' : 'outline'}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
