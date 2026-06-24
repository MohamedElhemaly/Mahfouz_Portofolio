'use client';

import { useState } from 'react';
import { usePortfolioData } from '@/lib/hooks/usePortfolioData';
import { ToastProvider, useToast } from '@/app/components/admin/Toast';
import { Save, RotateCcw, Plus, X } from 'lucide-react';
import { AboutData } from '@/lib/data/types';

function AboutEditorContent() {
  const { data, update } = usePortfolioData();
  const { showToast } = useToast();
  const [about, setAbout] = useState<AboutData>(data.about);
  const [newHighlight, setNewHighlight] = useState('');

  const handleSave = () => {
    update('about', about);
    showToast('About section saved successfully!');
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setAbout({ ...about, highlights: [...about.highlights, newHighlight.trim()] });
      setNewHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    setAbout({ ...about, highlights: about.highlights.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>About Section</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Edit your personal story and biography</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-outline" onClick={() => { setAbout(data.about); showToast('Changes reverted', 'error'); }}>
            <RotateCcw size={14} style={{ marginRight: '6px', display: 'inline' }} /> Reset
          </button>
          <button className="admin-btn admin-btn-primary" onClick={handleSave}>
            <Save size={14} style={{ marginRight: '6px', display: 'inline' }} /> Save Changes
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="admin-card">
          <label className="admin-label">Biography</label>
          <textarea className="admin-textarea" value={about.biography} onChange={e => setAbout({ ...about, biography: e.target.value })} rows={5} />
        </div>

        <div className="admin-card">
          <label className="admin-label">Summary Quote</label>
          <textarea className="admin-textarea" value={about.summary} onChange={e => setAbout({ ...about, summary: e.target.value })} rows={3} />
        </div>

        <div className="admin-card">
          <label className="admin-label">Personal Story</label>
          <textarea className="admin-textarea" value={about.personalStory} onChange={e => setAbout({ ...about, personalStory: e.target.value })} rows={6} />
        </div>

        <div className="admin-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>Key Highlights</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {about.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ flex: 1, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{h}</span>
                <button onClick={() => removeHighlight(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input className="admin-input" value={newHighlight} onChange={e => setNewHighlight(e.target.value)} placeholder="Add a highlight..." onKeyDown={e => e.key === 'Enter' && addHighlight()} />
            <button className="admin-btn admin-btn-primary" onClick={addHighlight} style={{ flexShrink: 0 }}>
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutEditor() {
  return <ToastProvider><AboutEditorContent /></ToastProvider>;
}
