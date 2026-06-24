'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Sparkles,
  User,
  Briefcase,
  Zap,
  FolderOpen,
  GraduationCap,
  Shield,
  Award,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Hero', href: '/admin/hero', icon: Sparkles },
  { label: 'About', href: '/admin/about', icon: User },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Skills', href: '/admin/skills', icon: Zap },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Education', href: '/admin/education', icon: GraduationCap },
  { label: 'Certifications', href: '/admin/certifications', icon: Shield },
  { label: 'Achievements', href: '/admin/achievements', icon: Award },
  { label: 'Contact', href: '/admin/contact', icon: Mail },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isChecking, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isChecking && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isChecking, pathname, router]);

  // Show login page without layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isChecking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-initials" style={{ fontSize: '2rem' }}>YM</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar">
        {/* Logo */}
        <div style={{ padding: '0 24px', marginBottom: '32px' }}>
          <Link href="/admin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 800 }}>YM</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Admin
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map(item => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${isActive ? 'admin-nav-item-active' : ''}`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div style={{ marginTop: 'auto', padding: '24px', borderTop: '1px solid var(--border-subtle)', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <Link
            href="/"
            target="_blank"
            className="admin-nav-item"
            style={{ marginBottom: '4px' }}
          >
            <ExternalLink size={18} />
            View Portfolio
          </Link>
          <button
            onClick={() => {
              logout();
              router.push('/admin/login');
            }}
            className="admin-nav-item"
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              color: '#ef4444',
            }}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-content">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ maxWidth: '1000px' }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
