'use client';

import { motion } from 'framer-motion';
import { EducationItem } from '@/lib/data/types';
import SectionWrapper, { AnimatedItem } from './SectionWrapper';
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from 'lucide-react';

interface EducationProps {
  data: EducationItem[];
}

export default function Education({ data }: EducationProps) {
  return (
    <SectionWrapper id="education">
      <AnimatedItem>
        <span className="section-label">
          <GraduationCap size={14} />
          Education
        </span>
      </AnimatedItem>

      <AnimatedItem delay={0.1}>
        <h2 className="section-title">
          Academic <span className="gradient-text">Foundation</span>
        </h2>
      </AnimatedItem>

      <div style={{ marginTop: '48px', maxWidth: '800px' }}>
        {data.map((edu, index) => (
          <motion.div
            key={edu.id}
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            style={{
              padding: '36px',
              marginBottom: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative gradient corner */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.08), transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Degree & Institution */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary-light)',
                  flexShrink: 0,
                }}
              >
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>
                  {edu.degree}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <MapPin size={14} />
                    {edu.institution}, {edu.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <Calendar size={14} />
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Grade */}
            {edu.grade && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: 'rgba(34, 197, 94, 0.08)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  borderRadius: '100px',
                  marginBottom: '20px',
                }}
              >
                <Award size={14} style={{ color: '#22c55e' }} />
                <span style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 600 }}>
                  Grade: {edu.grade}
                </span>
              </div>
            )}

            {/* Coursework */}
            {edu.coursework.length > 0 && (
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  <BookOpen size={14} />
                  Relevant Coursework
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {edu.coursework.map(course => (
                    <span
                      key={course}
                      style={{
                        padding: '5px 14px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        background: 'var(--bg-surface-hover)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
