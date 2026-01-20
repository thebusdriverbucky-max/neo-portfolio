'use client'

import { motion } from 'framer-motion'
import { Code, Layers, Palette, Wrench } from 'lucide-react'
import type { Service } from '@prisma/client'

interface ServiceCardProps {
  service: Service
  index: number
}

const iconMap = {
  Code: Code,
  Layers: Layers,
  Palette: Palette,
  Wrench: Wrench,
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon ? iconMap[service.icon as keyof typeof iconMap] : Code

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 border-2 border-amber-500/30 hover:border-amber-500/60"
    >
      <div className="bg-gradient-to-br from-[#FFA500] to-[#FFD700] w-16 h-16 rounded-xl flex items-center justify-center mb-6">
        {Icon && <Icon className="w-8 h-8 text-slate-900" />}
      </div>

      <h3 className="text-2xl font-bold text-white mb-5">{service.title}</h3>
      <p className="text-white/80 mb-6 leading-relaxed">{service.description}</p>

      {service.price && (
        <div className="text-2xl font-bold bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent mb-6">
          {service.price}
        </div>
      )}

      <ul className="space-y-4">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-white/90">
            <span className="text-[#FFD700] text-xl font-bold flex-shrink-0 mt-0.5">✓</span>
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
