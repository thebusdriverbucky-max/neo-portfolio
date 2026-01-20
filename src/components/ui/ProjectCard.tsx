'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border-2 border-amber-500/20 hover:border-amber-500/50"
    >
      {/* Изображение */}
      <div className="relative h-64 overflow-hidden bg-gradient-primary">
        <Image
          src={project.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Ссылки при hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-slate-900 p-3 rounded-full hover:bg-gradient-to-r hover:from-[#FFA500] hover:to-[#FFD700] hover:text-white transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-slate-900 p-3 rounded-full hover:bg-gradient-to-r hover:from-[#FFA500] hover:to-[#FFD700] hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Контент */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#FFD700] transition-colors">
          {project.title}
        </h3>
        <p className="text-white/80 mb-6 line-clamp-2 leading-relaxed">{project.description}</p>

        {/* Технологии */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-slate-600/50 text-white/90 text-sm rounded-full border border-amber-500/30"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-3 py-1 bg-slate-600/50 text-white/70 text-sm rounded-full border border-amber-500/20">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
