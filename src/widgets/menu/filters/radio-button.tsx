import { useRef } from 'react'
import { Button, Label, RadioGroupItem } from '@/shared/ui'

interface Props {
  className?: string
  id: string
  label: string
  onClick?: () => void
}
export function RadioButton({ className, id, label, onClick }: Props) {
  const radioRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    // Программно кликаем на radio элемент
    radioRef.current?.click()
    onClick?.()
  }

  return (
    <div
      onClick={handleClick}
      className="w-fit  border-foreground px-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 py-1.5"
    >
      <RadioGroupItem
        ref={radioRef}
        className="bg-background pointer-events-none"
        value={id}
        id={id}
      />
      <Label className="cursor-pointer -mt-1 pointer-events-none" htmlFor={id}>
        {label}
      </Label>
    </div>
  )
}
