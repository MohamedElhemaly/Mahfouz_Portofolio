'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SkillCategory } from '@/lib/data/types';
import SectionWrapper, { AnimatedItem } from './SectionWrapper';
import { Zap, BarChart3, DollarSign, Wrench, Brain, Users } from 'lucide-react';

interface SkillsProps {
  data: SkillCategory[];
}

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 size={22} />,
  DollarSign: <DollarSign size={22} />,
  Wrench: <Wrench size={22} />,
  Brain: <Brain size={22} />,
  Users: <Users size={22} />,
};

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{name}</span>
        <motion.span
          style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}

export default function Skills({ data }: SkillsProps) {
  return (
    <SectionWrapper id="skills">
      <AnimatedItem>
        <span className="section-label">
          <Zap size={14} />
          Skills & Expertise
        </span>
      </AnimatedItem>

      <AnimatedItem delay={0.1}>
        <h2 className="section-title">
          Technical <span className="gradient-text">Arsenal</span>
        </h2>
      </AnimatedItem>

      <AnimatedItem delay={0.15}>
        <p className="section-subtitle">
          A versatile skill set spanning data analytics, finance, AI, and leadership — continuously expanding.
        </p>
      </AnimatedItem>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '48px',
        }}
      >
        {data.map((category, catIndex) => (
          <motion.div
            key={category.id}
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            whileHover={{
              borderColor: 'var(--accent-primary)',
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.15)',
            }}
            style={{ padding: '28px' }}
          >
            {/* Category header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary-light)',
                }}
              >
                {iconMap[category.icon] || <Zap size={22} />}
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{category.name}</h3>
            </div>

            {/* Skills */}
            {category.skills.map((skill, skillIndex) => (
              <SkillBar
                key={skill.id}
                name={skill.name}
                level={skill.level}
                delay={catIndex * 0.1 + skillIndex * 0.08}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
