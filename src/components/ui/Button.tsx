import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'destructive_outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95'

  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:from-secondary hover:to-primary',
    secondary: 'bg-white text-dark shadow-lg hover:shadow-xl hover:bg-gradient-to-br hover:from-slate-900 hover:via-slate-800 hover:to-slate-700 hover:text-white hover:border-primary border-2 border-transparent hover:shadow-[0_0_20px_rgba(255,165,0,0.6)]',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white hover:border-transparent shadow-md hover:shadow-xl',
    ghost: 'bg-transparent text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10',
        destructive: 'bg-red-600 text-white shadow-lg hover:shadow-xl hover:bg-red-700',
        destructive_outline: 'bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white shadow-md hover:shadow-xl',
  }

  const sizes = {
    sm: 'px-5 py-2.5 text-sm gap-2',
    md: 'px-7 py-3.5 text-base gap-3',
    lg: 'px-10 py-5 text-lg gap-3',
  }

  const styles = cn(baseStyles, variants[variant], sizes[size], className)

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  )
}
