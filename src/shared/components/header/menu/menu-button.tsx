'use client'
import { Button } from '@/shared/ui'
import { ReactNode, ReactElement, cloneElement } from 'react'

interface Props {
  icon: ReactElement<{ className?: string }>
  title: string
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  asChild?: boolean
}

export function MenuButton({
  icon,
  title,
  children,
  onClick,
  disabled,
  className = '',
  asChild,
}: Props) {
  const baseClassName =
    'rounded-lg size-14 shadow-sm border-foreground border-2 active:scale-90 will-change-transform transition-all duration-200'
  const iconClassName = 'size-8'
  // Применяем класс к иконке
  const existingClassName = icon.props?.className || ''
  const iconWithClassName = cloneElement(icon, {
    className: `${iconClassName} ${existingClassName}`.trim(),
  })

  return (
    <Button
      className={`${baseClassName} ${className}`}
      variant="outline"
      title={title}
      onClick={onClick}
      disabled={disabled}
      asChild={asChild}
    >
      {iconWithClassName}
      {children}
    </Button>
  )
}
