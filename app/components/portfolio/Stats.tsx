'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { AchievementItem } from '@/lib/data/types';
import SectionWrapper, { AnimatedItem } from './SectionWrapper';
import { TrendingUp, Award, Briefcase, FolderOpen, BarChart3 } from 'lucide-react';

interface StatsProps {
  data: AchievementItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={28} />,
  Award: <Award size={28} />,
  Briefcase: <Briefcase size={28} />,
  FolderOpen: <FolderOpen size={28} />,
};

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  // Extract numeric part
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const prefix = value.match(/^[^0-9]*/)?.[0] || '';
  const suffixFromValue = value.match(/[^0-9]*$/)?.[0] || '';

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericValue);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, numericValue]);

  return (
    <span ref={ref} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {prefix}{count}{suffixFromValue}
    </span>
  );
}

export default function Stats({ data }: StatsProps) {
  return (
    <SectionWrapper id="achievements">
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.03), transparent)',
          pointerEvents: 'none',
        }}
      />

      <AnimatedItem>
        <div style={{ textAlign: 'center' }}>
          <span className="section-label" style={{ margin: '0 auto' }}>
            <BarChart3 size={14} />
            Achievements
          </span>
        </div>
      </AnimatedItem>

      <AnimatedItem delay={0.1}>
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          Impact in <span className="gradient-text">Numbers</span>
        </h2>
      </AnimatedItem>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          marginTop: '48px',
        }}
      >
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            className="glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            style={{
              padding: '32px 24px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow effect */}
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary-light)',
                margin: '0 auto 16px',
              }}
            >
              {iconMap[item.icon] || <TrendingUp size={28} />}
            </div>

            <div
              style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                marginBottom: '8px',
                lineHeight: 1,
              }}
              className="gradient-text"
            >
              <AnimatedCounter value={item.value} />
            </div>

            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '6px' }}>
              {item.title}
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5 }}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
