'use client';

import { useState, useRef } from 'react';
import { usePortfolioData } from '@/lib/hooks/usePortfolioData';
import { ToastProvider, useToast } from '@/app/components/admin/Toast';
import { exportPortfolioData, importPortfolioData, resetPortfolioData } from '@/lib/utils/storage';
import { Save, RotateCcw, Download, Upload, Palette, Type, Globe, AlertTriangle } from 'lucide-react';
import { ThemeSettings, SEOSettings } from '@/lib/data/types';

function SettingsContent() {
  const { data, update, reset } = usePortfolioData();
  const { showToast } = useToast();
  const [theme, setTheme] = useState<ThemeSettings>(data.theme);
  const [seo, setSeo] = useState<SEOSettings>(data.seo);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveTheme = () => { update('theme', theme); showToast('Theme settings saved!'); };
  const handleSaveSEO = () => { update('seo', seo); showToast('SEO settings saved!'); };

  const handleExport = () => {
    const jsonData = exportPortfolioData();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Portfolio data exported!');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const success = importPortfolioData(content);
      if (success) {
        showToast('Portfolio data imported! Refreshing...');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast('Invalid JSON file', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    reset();
    setShowResetConfirm(false);
    showToast('Portfolio reset to defaults!');
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Theme, SEO, and data management</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Theme Customizer */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Palette size={18} style={{ color: 'var(--accent-primary-light)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Theme Customizer</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="admin-label">Mode</label>
              <select className="admin-input" value={theme.mode} onChange={e => setTheme({ ...theme, mode: e.target.value as 'dark' | 'light' })} style={{ cursor: 'pointer' }}>
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
              </select>
            </div>
            <div>
              <label className="admin-label">Primary Color</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input type="color" value={theme.primaryColor} onChange={e => setTheme({ ...theme, primaryColor: e.target.value })} style={{ width: '40px', height: '36px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }} />
                <input className="admin-input" value={theme.primaryColor} onChange={e => setTheme({ ...theme, primaryColor: e.target.value })} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }} />
              </div>
            </div>
            <div>
              <label className="admin-label">Secondary Color</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input type="color" value={theme.secondaryColor} onChange={e => setTheme({ ...theme, secondaryColor: e.target.value })} style={{ width: '40px', height: '36px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }} />
                <input className="admin-input" value={theme.secondaryColor} onChange={e => setTheme({ ...theme, secondaryColor: e.target.value })} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }} />
              </div>
            </div>
            <div>
              <label className="admin-label">Background Color</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input type="color" value={theme.backgroundColor} onChange={e => setTheme({ ...theme, backgroundColor: e.target.value })} style={{ width: '40px', height: '36px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }} />
                <input className="admin-input" value={theme.backgroundColor} onChange={e => setTheme({ ...theme, backgroundColor: e.target.value })} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }} />
              </div>
            </div>
          </div>

          <button className="admin-btn admin-btn-primary" onClick={handleSaveTheme}>
            <Save size={14} style={{ marginRight: '6px', display: 'inline' }} /> Save Theme
          </button>
        </div>

        {/* Font Customizer */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Type size={18} style={{ color: 'var(--accent-primary-light)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Typography</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="admin-label">Heading Font</label>
              <select className="admin-input" value={theme.headingFont} onChange={e => setTheme({ ...theme, headingFont: e.target.value })} style={{ cursor: 'pointer' }}>
                <option value="Inter">Inter</option>
                <option value="Outfit">Outfit</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Space Grotesk">Space Grotesk</option>
              </select>
            </div>
            <div>
              <label className="admin-label">Body Font</label>
              <select className="admin-input" value={theme.bodyFont} onChange={e => setTheme({ ...theme, bodyFont: e.target.value })} style={{ cursor: 'pointer' }}>
                <option value="Inter">Inter</option>
                <option value="Outfit">Outfit</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="DM Sans">DM Sans</option>
              </select>
            </div>
          </div>

          <button className="admin-btn admin-btn-primary" onClick={handleSaveTheme}>
            <Save size={14} style={{ marginRight: '6px', display: 'inline' }} /> Save Typography
          </button>
        </div>

        {/* SEO Settings */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Globe size={18} style={{ color: 'var(--accent-primary-light)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>SEO Settings</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
            <div><label className="admin-label">Page Title</label><input className="admin-input" value={seo.title} onChange={e => setSeo({ ...seo, title: e.target.value })} /></div>
            <div><label className="admin-label">Meta Description</label><textarea className="admin-textarea" value={seo.description} onChange={e => setSeo({ ...seo, description: e.target.value })} rows={3} /></div>
            <div><label className="admin-label">Keywords (comma separated)</label><input className="admin-input" value={seo.keywords.join(', ')} onChange={e => setSeo({ ...seo, keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean) })} /></div>
          </div>

          <button className="admin-btn admin-btn-primary" onClick={handleSaveSEO}>
            <Save size={14} style={{ marginRight: '6px', display: 'inline' }} /> Save SEO
          </button>
        </div>

        {/* Data Management */}
        <div className="admin-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>Data Management</h3>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <button className="admin-btn admin-btn-outline" onClick={handleExport}>
              <Download size={14} style={{ marginRight: '6px', display: 'inline' }} /> Export Data
            </button>
            <button className="admin-btn admin-btn-outline" onClick={() => fileInputRef.current?.click()}>
              <Upload size={14} style={{ marginRight: '6px', display: 'inline' }} /> Import Data
            </button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
          </div>

          {/* Reset */}
          <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: 'var(--radius)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <AlertTriangle size={16} style={{ color: '#ef4444' }} />
              <h4 style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: 600 }}>Danger Zone</h4>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '12px' }}>
              Reset all portfolio data to default values. This cannot be undone.
            </p>
            {!showResetConfirm ? (
              <button className="admin-btn admin-btn-danger" onClick={() => setShowResetConfirm(true)}>
                <RotateCcw size={14} style={{ marginRight: '6px', display: 'inline' }} /> Reset to Defaults
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 600 }}>Are you sure?</span>
                <button className="admin-btn admin-btn-danger" onClick={handleReset}>Yes, Reset Everything</button>
                <button className="admin-btn admin-btn-outline" onClick={() => setShowResetConfirm(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return <ToastProvider><SettingsContent /></ToastProvider>;
}
