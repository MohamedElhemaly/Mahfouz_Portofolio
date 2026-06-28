'use client';

import { usePortfolioData } from '@/lib/hooks/usePortfolioData';
import { motion } from 'framer-motion';
import { ToastProvider } from '../components/admin/Toast';
import {
  Sparkles,
  Briefcase,
  Zap,
  FolderOpen,
  Shield,
  BarChart3,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

const quickLinks = [
  { label: 'Edit Hero', href: '/admin/hero', icon: Sparkles, color: '#6366f1' },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase, color: '#22c55e' },
  { label: 'Skills', href: '/admin/skills', icon: Zap, color: '#f59e0b' },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen, color: '#06b6d4' },
  { label: 'Certifications', href: '/admin/certifications', icon: Shield, color: '#8b5cf6' },
];

export default function AdminDashboard() {
  const { data, isLoaded } = usePortfolioData();

  if (!isLoaded) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '16px' }}>
        <div className="loading-initials" style={{ fontSize: '2rem' }}>YM</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading dashboard...</div>
      </div>
    );
  }

  const stats = [
    { label: 'Experience Items', value: data.experience.length, color: '#22c55e' },
    { label: 'Skill Categories', value: data.skillCategories.length, color: '#6366f1' },
    { label: 'Projects', value: data.projects.length, color: '#06b6d4' },
    { label: 'Certifications', value: data.certifications.length, color: '#f59e0b' },
  ];

  return (
    <ToastProvider>
      <div>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
            Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Welcome back! Manage your portfolio content from here.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="admin-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                {stat.label}
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: stat.color }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>
          Quick Actions
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          {quickLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <Link
                  href={link.href}
                  className="admin-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none',
                    padding: '16px 20px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: `${link.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: link.color,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Current Portfolio Info */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Portfolio Preview</h3>
            <Link
              href="/"
              target="_blank"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--accent-primary-light)',
                fontSize: '0.85rem',
                textDecoration: 'none',
              }}
            >
              <Eye size={14} />
              View Live
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Name</p>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>{data.hero.name}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Title</p>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>{data.hero.title}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</p>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>{data.contact.email}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Skills</p>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>
                {data.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
