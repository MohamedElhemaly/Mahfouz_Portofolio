'use client';

import { motion } from 'framer-motion';
import { ContactData } from '@/lib/data/types';
import SectionWrapper, { AnimatedItem } from './SectionWrapper';
import { Mail, MapPin, Phone, Download, ArrowUpRight, Send } from 'lucide-react';

interface ContactProps {
  data: ContactData;
}

export default function Contact({ data }: ContactProps) {
  return (
    <SectionWrapper id="contact">
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center bottom, rgba(99, 102, 241, 0.08), transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <AnimatedItem>
          <span className="section-label" style={{ margin: '0 auto' }}>
            <Send size={14} />
            Contact
          </span>
        </AnimatedItem>

        <AnimatedItem delay={0.1}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Let&apos;s Build Something{' '}
            <span className="gradient-text">Great Together</span>
          </h2>
        </AnimatedItem>

        <AnimatedItem delay={0.15}>
          <p className="section-subtitle" style={{ margin: '0 auto 48px', textAlign: 'center' }}>
            I&apos;m actively seeking Financial Analyst and Data Analyst opportunities in banking and financial services.
            Let&apos;s connect and explore how I can add value to your team.
          </p>
        </AnimatedItem>

        {/* Contact cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          {/* Email */}
          <motion.a
            href={`mailto:${data.email}`}
            className="glass-card"
            whileHover={{ scale: 1.02 }}
            style={{
              padding: '24px',
              textDecoration: 'none',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(99, 102, 241, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary-light)',
              }}
            >
              <Mail size={22} />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
              Email
            </span>
            <span style={{ color: 'var(--text-primary)', fontSize: '0.8rem' }}>
              {data.email}
            </span>
          </motion.a>

          {/* LinkedIn */}
          {data.linkedin && (
            <motion.a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card"
              whileHover={{ scale: 1.02 }}
              style={{
                padding: '24px',
                textDecoration: 'none',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#06b6d4',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
                LinkedIn
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)', fontSize: '0.8rem' }}>
                Connect <ArrowUpRight size={12} />
              </span>
            </motion.a>
          )}

          {/* Phone */}
          {data.phone && (
            <motion.a
              href={`tel:${data.phone}`}
              className="glass-card"
              whileHover={{ scale: 1.02 }}
              style={{
                padding: '24px',
                textDecoration: 'none',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(249, 115, 22, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f97316',
                }}
              >
                <Phone size={22} />
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
                Phone
              </span>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.8rem' }}>
                {data.phone}
              </span>
            </motion.a>
          )}

          {/* Location */}
          <motion.div
            className="glass-card"
            style={{
              padding: '24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(34, 197, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#22c55e',
              }}
            >
              <MapPin size={22} />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
              Location
            </span>
            <span style={{ color: 'var(--text-primary)', fontSize: '0.8rem' }}>
              {data.location}
            </span>
          </motion.div>
        </div>

        {/* Resume Download */}
        <AnimatedItem delay={0.3}>
          <motion.a
            href={data.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              fontSize: '1rem',
              padding: '16px 36px',
            }}
          >
            <Download size={18} />
            Download My Resume
          </motion.a>
        </AnimatedItem>
      </div>
    </SectionWrapper>
  );
}
