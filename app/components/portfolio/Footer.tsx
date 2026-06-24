'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <motion.span
          className="gradient-text"
          style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.03em' }}
          whileHover={{ scale: 1.05 }}
        >
          YM
        </motion.span>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          © {new Date().getFullYear()} Youssef Mahfouz. Crafted with{' '}
          <Heart size={12} style={{ color: '#ef4444' }} /> and ambition.
        </p>
      </motion.div>
    </footer>
  );
}
