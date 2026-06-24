'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 400);
          return 100;
        }
        const increment = Math.random() * 12 + 3;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Background gradient orbs */}
          <div
            className="gradient-orb gradient-orb-1"
            style={{ top: '20%', left: '30%' }}
          />
          <div
            className="gradient-orb gradient-orb-2"
            style={{ bottom: '20%', right: '20%' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
          >
            <motion.div
              className="loading-initials"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              YM
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginTop: '12px',
              }}
            >
              Portfolio
            </motion.p>

            <div className="loading-bar-track">
              <motion.div
                className="loading-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5 }}
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                marginTop: '12px',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {Math.round(progress)}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
