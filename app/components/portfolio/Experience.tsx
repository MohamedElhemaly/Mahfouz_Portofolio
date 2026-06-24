'use client';

import { motion } from 'framer-motion';
import { ExperienceItem } from '@/lib/data/types';
import SectionWrapper, { AnimatedItem } from './SectionWrapper';
import { Briefcase, Building2, MapPin, Calendar } from 'lucide-react';

interface ExperienceProps {
  data: ExperienceItem[];
}

const typeColors: Record<string, string> = {
  work: '#22c55e',
  internship: '#6366f1',
  training: '#f59e0b',
  volunteer: '#06b6d4',
};

const typeLabels: Record<string, string> = {
  work: 'Full-time',
  internship: 'Internship',
  training: 'Training',
  volunteer: 'Volunteer',
};

export default function Experience({ data }: ExperienceProps) {
  return (
    <SectionWrapper id="experience">
      <AnimatedItem>
        <span className="section-label">
          <Briefcase size={14} />
          Experience
        </span>
      </AnimatedItem>

      <AnimatedItem delay={0.1}>
        <h2 className="section-title">
          Professional <span className="gradient-text">Journey</span>
        </h2>
      </AnimatedItem>

      <AnimatedItem delay={0.15}>
        <p className="section-subtitle">
          A timeline of growth — from customer service excellence to data analytics and sustainable finance.
        </p>
      </AnimatedItem>

      <div style={{ marginTop: '64px', position: 'relative' }}>
        {/* Timeline line */}
        <div
          style={{
            position: 'absolute',
            left: '28px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, var(--accent-primary) 10%, var(--accent-primary) 90%, transparent)',
          }}
        />

        {data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{
              position: 'relative',
              paddingLeft: '72px',
              paddingBottom: index < data.length - 1 ? '48px' : '0',
            }}
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
              style={{
                position: 'absolute',
                left: '20px',
                top: '8px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: typeColors[item.type] || 'var(--accent-primary)',
                border: '3px solid var(--bg-deep)',
                boxShadow: `0 0 20px ${typeColors[item.type]}60`,
                zIndex: 2,
              }}
            />

            {/* Content card */}
            <motion.div
              className="glass-card"
              style={{ padding: '28px' }}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
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
                  color: typeColors[item.type],
                  background: `${typeColors[item.type]}15`,
                  border: `1px solid ${typeColors[item.type]}30`,
                  marginBottom: '12px',
                }}
              >
                {typeLabels[item.type]}
              </span>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
                {item.title}
              </h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <Building2 size={14} />
                  {item.company}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <MapPin size={14} />
                  {item.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <Calendar size={14} />
                  {item.startDate} — {item.endDate}
                </span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {item.description.map((desc, i) => (
                  <li
                    key={i}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      paddingLeft: '16px',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '10px',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: 'var(--accent-primary)',
                      }}
                    />
                    {desc}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
