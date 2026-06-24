'use client';

import { motion } from 'framer-motion';
import { AboutData } from '@/lib/data/types';
import SectionWrapper, { AnimatedItem } from './SectionWrapper';
import { User, CheckCircle } from 'lucide-react';

interface AboutProps {
  data: AboutData;
}

export default function About({ data }: AboutProps) {
  return (
    <SectionWrapper id="about">
      <AnimatedItem>
        <span className="section-label">
          <User size={14} />
          About Me
        </span>
      </AnimatedItem>

      <AnimatedItem delay={0.1}>
        <h2 className="section-title">
          Get to Know <span className="gradient-text">Me</span>
        </h2>
      </AnimatedItem>

      <div className="about-grid">
        {/* Left — Story */}
        <AnimatedItem delay={0.2} direction="left">
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '20px' }}>
              {data.biography}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8 }}>
              {data.personalStory}
            </p>
          </div>
        </AnimatedItem>

        {/* Right — Highlights + Summary */}
        <AnimatedItem delay={0.3} direction="right">
          <div>
            <div
              className="glass-card"
              style={{ padding: '28px', marginBottom: '24px' }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>
                Key Highlights
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {data.highlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                  >
                    <CheckCircle size={16} style={{ color: 'var(--accent-primary-light)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div
              className="glass-card"
              style={{ padding: '24px', borderLeft: '3px solid var(--accent-primary)' }}
            >
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                &ldquo;{data.summary}&rdquo;
              </p>
            </div>
          </div>
        </AnimatedItem>
      </div>

    </SectionWrapper>
  );
}
