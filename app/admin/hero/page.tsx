'use client';

import { useState } from 'react';
import { usePortfolioData } from '@/lib/hooks/usePortfolioData';
import { ToastProvider, useToast } from '@/app/components/admin/Toast';
import { Save, RotateCcw } from 'lucide-react';
import { HeroData } from '@/lib/data/types';

interface HeroEditorContentProps {
  data: any;
  update: any;
}

function HeroEditorContent({ data, update }: HeroEditorContentProps) {
  const { showToast } = useToast();
  const [hero, setHero] = useState<HeroData>(data.hero);

  const handleSave = () => {
    update('hero', hero);
    showToast('Hero section saved successfully!');
  };

  const handleReset = () => {
    setHero(data.hero);
    showToast('Changes reverted', 'error');
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Hero Section</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Edit your hero section content</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-outline" onClick={handleReset}>
            <RotateCcw size={14} style={{ marginRight: '6px', display: 'inline' }} />
            Reset
          </button>
          <button className="admin-btn admin-btn-primary" onClick={handleSave}>
            <Save size={14} style={{ marginRight: '6px', display: 'inline' }} />
            Save Changes
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="admin-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>Personal Info</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="admin-label">Name</label>
              <input className="admin-input" value={hero.name} onChange={e => setHero({ ...hero, name: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Title</label>
              <input className="admin-input" value={hero.title} onChange={e => setHero({ ...hero, title: e.target.value })} />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="admin-label">Subtitle</label>
            <input className="admin-input" value={hero.subtitle} onChange={e => setHero({ ...hero, subtitle: e.target.value })} />
          </div>

          <div>
            <label className="admin-label">Description</label>
            <textarea className="admin-textarea" value={hero.description} onChange={e => setHero({ ...hero, description: e.target.value })} rows={4} />
          </div>
        </div>

        <div className="admin-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>Call-to-Action Buttons</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="admin-label">Primary Button Text</label>
              <input className="admin-input" value={hero.buttons.primary.text} onChange={e => setHero({ ...hero, buttons: { ...hero.buttons, primary: { ...hero.buttons.primary, text: e.target.value } } })} />
            </div>
            <div>
              <label className="admin-label">Primary Button Link</label>
              <input className="admin-input" value={hero.buttons.primary.href} onChange={e => setHero({ ...hero, buttons: { ...hero.buttons, primary: { ...hero.buttons.primary, href: e.target.value } } })} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="admin-label">Secondary Button Text</label>
              <input className="admin-input" value={hero.buttons.secondary.text} onChange={e => setHero({ ...hero, buttons: { ...hero.buttons, secondary: { ...hero.buttons.secondary, text: e.target.value } } })} />
            </div>
            <div>
              <label className="admin-label">Secondary Button Link</label>
              <input className="admin-input" value={hero.buttons.secondary.href} onChange={e => setHero({ ...hero, buttons: { ...hero.buttons, secondary: { ...hero.buttons.secondary, href: e.target.value } } })} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>Profile Image</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="admin-label">Upload Profile Image</label>
              <input 
                type="file" 
                accept="image/*" 
                className="admin-input" 
                style={{ cursor: 'pointer' }}
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const result = reader.result;
                      if (typeof result === 'string') {
                        setHero(prev => ({ ...prev, profileImage: result }));
                        showToast('Image uploaded and converted successfully!');
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <div>
              <label className="admin-label">Or Image URL / Base64</label>
              <input className="admin-input" value={hero.profileImage} onChange={e => setHero({ ...hero, profileImage: e.target.value })} placeholder="Paste image URL or use base64" />
            </div>
            {hero.profileImage && (
              <div style={{ marginTop: '8px' }}>
                <span className="admin-label">Preview</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img 
                    src={hero.profileImage} 
                    alt="Profile Preview" 
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)', background: 'rgba(255,255,255,0.05)' }} 
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    Successfully loaded. Large images will be compressed to base64.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroEditor() {
  const { data, update, isLoaded } = usePortfolioData();

  if (!isLoaded) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '16px' }}>
        <div className="loading-initials" style={{ fontSize: '2rem' }}>YM</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading hero section...</div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <HeroEditorContent data={data} update={update} />
    </ToastProvider>
  );
}
