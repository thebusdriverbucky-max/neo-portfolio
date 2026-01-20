'use client'
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  symbol: string
  size: number
  opacity: number
}

export default function CodeParticles() {
  const svgRef = useRef<SVGSVGElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = window.innerWidth
    const height = window.innerHeight

    // Символы кода для анимации
    const codeSymbols = ['{', '}', '</>', '=>', 'async', '[]', '()', 'const', 'let', '<>', '/>', '{}', '===', '...']

    // Создаем 50 частиц
    const particles: Particle[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
      size: Math.random() * 20 + 15,
      opacity: Math.random() * 0.15 + 0.1
    }))

    particlesRef.current = particles

    // Отслеживание мыши
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Анимация
    const animate = () => {
      const mouse = mouseRef.current

      particlesRef.current.forEach(particle => {
        // Вычисляем расстояние до курсора
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Если частица близко к курсору - отталкиваем
        if (distance < 150) {
          const force = (150 - distance) / 150
          particle.vx -= (dx / distance) * force * 0.5
          particle.vy -= (dy / distance) * force * 0.5
        }

        // Обновляем позицию
        particle.x += particle.vx
        particle.y += particle.vy

        // Границы экрана (bounce)
        if (particle.x < 0) {
          particle.x = 0
          particle.vx *= -1
        }
        if (particle.x > width) {
          particle.x = width
          particle.vx *= -1
        }
        if (particle.y < 0) {
          particle.y = 0
          particle.vy *= -1
        }
        if (particle.y > height) {
          particle.y = height
          particle.vy *= -1
        }

        // Затухание скорости
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Добавляем случайное движение
        particle.vx += (Math.random() - 0.5) * 0.1
        particle.vy += (Math.random() - 0.5) * 0.1
      })

      // Рендерим частицы
      const texts = svg
        .selectAll('text')
        .data(particlesRef.current)

      texts
        .enter()
        .append('text')
        .merge(texts as any)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('font-size', d => d.size)
        .attr('opacity', d => d.opacity)
        .attr('fill', '#0F172A')
        .attr('font-family', 'monospace')
        .attr('font-weight', 'bold')
        .text(d => d.symbol)

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
