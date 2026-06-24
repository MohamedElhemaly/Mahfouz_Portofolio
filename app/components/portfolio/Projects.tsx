'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectItem } from '@/lib/data/types';
import SectionWrapper, { AnimatedItem } from './SectionWrapper';
import { FolderOpen, ExternalLink, ChevronRight } from 'lucide-react';

interface ProjectsProps {
  data: ProjectItem[];
}

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
  technical: { bg: 'rgba(99, 102, 241, 0.1)', text: '#818cf8', label: 'Technical' },
  academic: { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b', label: 'Academic' },
  social: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e', label: 'Social Impact' },
};

export default function Projects({ data }: ProjectsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <SectionWrapper id="projects">
      <AnimatedItem>
        <span className="section-label">
          <FolderOpen size={14} />
          Projects
        </span>
      </AnimatedItem>

      <AnimatedItem delay={0.1}>
        <h2 className="section-title">
          Featured <span className="gradient-text">Work</span>
        </h2>
      </AnimatedItem>

      <AnimatedItem delay={0.15}>
        <p className="section-subtitle">
          Projects that demonstrate analytical thinking, technical skill, and real-world impact.
        </p>
      </AnimatedItem>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginTop: '48px',
        }}
      >
        {data.map((project, index) => {
          const typeInfo = typeColors[project.type] || typeColors.technical;

          return (
            <motion.div
              key={project.id}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: '0',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Project header gradient */}
              <div
                style={{
                  height: '140px',
                  background: `linear-gradient(135deg, ${typeInfo.bg}, rgba(99, 102, 241, 0.05))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  animate={hoveredId === project.id ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: `${typeInfo.text}30`,
                    letterSpacing: '-0.03em',
                    userSelect: 'none',
                  }}
                >
                  {project.title.split(' ').slice(0, 2).map(w => w[0]).join('')}
                </motion.div>

                {/* Shimmer effect on hover */}
                {hoveredId === project.id && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                {/* Type badge */}
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: typeInfo.text,
                    background: typeInfo.bg,
                    marginBottom: '12px',
                  }}
                >
                  {typeInfo.label}
                </span>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '10px' }}>
                  {project.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '16px' }}>
                  {project.description.length > 150 ? project.description.substring(0, 150) + '...' : project.description}
                </p>

                {/* Technologies */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      style={{
                        padding: '3px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        background: 'var(--bg-surface-hover)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Impact */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary-light)', fontSize: '0.85rem' }}>
                  <ChevronRight size={14} />
                  <span>{project.impact}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
