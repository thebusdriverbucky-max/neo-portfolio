import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  background?: 'white' | 'gradient' | 'gray'
}

export default function Section({
  children,
  className = '',
  id,
  background = 'white'
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gradient: 'bg-gradient-to-br from-[#FFA500] via-[#FFB84D] to-[#FFD700]',
    gray: 'bg-gray-50',
  }

  return (
    <section
      id={id}
      className={cn('py-16 md:py-20', backgrounds[background], className)}
    >
      <div className="container">
        {children}
      </div>
    </section>
  )
}
