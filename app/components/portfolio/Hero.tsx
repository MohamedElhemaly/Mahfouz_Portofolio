'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HeroData } from '@/lib/data/types';
import { ArrowDown, Download, Sparkles } from 'lucide-react';

interface HeroProps {
  data: HeroData;
}

export default function Hero({ data }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.8 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 24px',
      }}
    >
      {/* Mouse spotlight */}
      <div className="mouse-spotlight" />

      {/* Gradient orbs */}
      <div className="gradient-orb gradient-orb-1" style={{ top: '-10%', left: '-5%' }} />
      <div className="gradient-orb gradient-orb-2" style={{ bottom: '-10%', right: '-5%' }} />
      <div className="gradient-orb gradient-orb-3" style={{ top: '40%', right: '20%' }} />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          zIndex: 1,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-container"
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left Column — Text & CTAs */}
        <div className="hero-text-col">
          {/* Status badge */}
          <motion.div 
            variants={itemVariants} 
            className="section-label hero-badge-container"
          >
            <Sparkles size={14} />
            Available for Opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              marginBottom: '8px',
              textAlign: 'inherit',
            }}
          >
            {data.name.split(' ').map((word, i) => (
              <span key={i}>
                {i === 1 ? <span className="gradient-text">{word}</span> : word}
                {i < data.name.split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: 'var(--accent-primary-light)',
              fontWeight: 600,
              marginBottom: '24px',
              letterSpacing: '0.5px',
            }}
          >
            {data.title}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="hero-desc-container"
            style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              color: 'var(--text-secondary)',
              maxWidth: '650px',
              lineHeight: 1.8,
            }}
          >
            {data.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="hero-ctas-container"
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '100%' }}
          >
            <motion.a
              href={data.buttons.primary.href}
              className="glow-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              {data.buttons.primary.text}
              <ArrowDown size={16} />
            </motion.a>

            <motion.a
              href={data.buttons.secondary.href}
              className="outline-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} />
              {data.buttons.secondary.text}
            </motion.a>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            style={{
              marginTop: '40px',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            {data.subtitle}
          </motion.p>
        </div>

        {/* Right Column — Animated Morphing Profile Image */}
        <motion.div
          variants={itemVariants}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '320px',
            aspectRatio: '1',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Animated Glow Backdrops */}
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
              filter: 'blur(20px)',
              opacity: 0.4,
              zIndex: 0,
            }}
            animate={{
              borderRadius: [
                '30% 70% 70% 30% / 30% 30% 70% 70%',
                '50% 50% 30% 70% / 50% 60% 40% 60%',
                '70% 30% 50% 50% / 30% 30% 70% 70%',
                '30% 70% 70% 30% / 30% 30% 70% 70%',
              ],
              rotate: [0, 120, 240, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              width: '106%',
              height: '106%',
              borderRadius: '50%',
              border: '2px dashed var(--border-subtle)',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
              zIndex: 0,
            }}
            animate={{
              scale: [1, 1.04, 1],
              rotate: [360, 240, 120, 0],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Morphing Image Frame */}
          <motion.div
            style={{
              width: '90%',
              height: '90%',
              overflow: 'hidden',
              zIndex: 1,
              border: '2px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            animate={{
              borderRadius: [
                '30% 70% 70% 30% / 30% 30% 70% 70%',
                '50% 50% 30% 70% / 50% 60% 40% 60%',
                '70% 30% 50% 50% / 30% 30% 70% 70%',
                '30% 70% 70% 30% / 30% 30% 70% 70%',
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.04,
              borderColor: 'var(--accent-primary)',
            }}
          >
            {data.profileImage ? (
              <img
                src={data.profileImage}
                alt={data.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scale(1.05)',
                }}
              />
            ) : (
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                {data.name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
