interface SectionDividerProps {
  color?: 'white' | 'gradient' | 'gray'
  flip?: boolean
}

export default function SectionDivider({
  color = 'white',
  flip = false
}: SectionDividerProps) {
  const colors = {
    white: '#FFFFFF',
    gradient: '#FFA500',
    gray: '#F9FAFB',
  }

  return (
    <div className="relative w-full h-12 md:h-16 overflow-hidden">
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
      >
        <path
          d="M0,0 L1200,60 L1200,120 L0,120 Z"
          fill={colors[color]}
        />
      </svg>
    </div>
  )
}
