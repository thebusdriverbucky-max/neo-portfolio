interface WaveDividerProps {
  flip?: boolean
  color?: 'orange' | 'dark'
}

export default function WaveDivider({ flip = false, color = 'orange' }: WaveDividerProps) {
  const fillColor = color === 'orange'
    ? '#FFA500'
    : '#1e293b' // slate-800

  return (
    <div className={`w-full ${flip ? 'rotate-180' : ''}`}>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64 C240,96 480,96 720,64 C960,32 1200,32 1440,64 L1440,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  )
}
