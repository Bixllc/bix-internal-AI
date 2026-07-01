import Link from 'next/link'
import type { ReactNode } from 'react'
import { buttonBaseClasses, buttonSizeClasses, buttonVariantClasses, type ButtonSize, type ButtonVariant } from './Button'

interface LinkButtonProps {
  href: string
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export function LinkButton({ href, children, variant = 'secondary', size = 'md', className = '' }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${buttonBaseClasses} ${buttonVariantClasses[variant]} ${buttonSizeClasses[size]} ${className}`}
    >
      {children}
    </Link>
  )
}
