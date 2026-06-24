'use client';

import { motion } from 'framer-motion';
import { CertificationItem } from '@/lib/data/types';
import SectionWrapper, { AnimatedItem } from './SectionWrapper';
import { Shield, ExternalLink, Award, Brain, DollarSign, Languages, Megaphone, Wrench } from 'lucide-react';

interface CertificationsProps {
  data: CertificationItem[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  Finance: <DollarSign size={18} />,
  AI: <Brain size={18} />,
  Language: <Languages size={18} />,
  Marketing: <Megaphone size={18} />,
  Tools: <Wrench size={18} />,
};

const categoryColors: Record<string, string> = {
  Finance: '#22c55e',
  AI: '#8b5cf6',
  Language: '#06b6d4',
  Marketing: '#f59e0b',
  Tools: '#6366f1',
};

export default function Certifications({ data }: CertificationsProps) {
  return (
    <SectionWrapper id="certifications">
      <AnimatedItem>
        <span className="section-label">
          <Shield size={14} />
          Certifications
        </span>
      </AnimatedItem>

      <AnimatedItem delay={0.1}>
        <h2 className="section-title">
          Professional <span className="gradient-text">Credentials</span>
        </h2>
      </AnimatedItem>

      <AnimatedItem delay={0.15}>
        <p className="section-subtitle">
          Continuous learning across finance, AI, analytics, and professional development.
        </p>
      </AnimatedItem>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          marginTop: '48px',
        }}
      >
        {data.map((cert, index) => {
          const color = categoryColors[cert.category] || '#6366f1';
          const icon = categoryIcons[cert.category] || <Award size={18} />;

          return (
            <motion.div
              key={cert.id}
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{
                borderColor: `${color}40`,
                boxShadow: `0 0 20px ${color}15`,
              }}
              style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: `${color}15`,
                  border: `1px solid ${color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color,
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 600, marginBottom: '4px', lineHeight: 1.4 }}>
                  {cert.name}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {cert.issuer}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>•</span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color,
                      fontWeight: 600,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {cert.year}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
