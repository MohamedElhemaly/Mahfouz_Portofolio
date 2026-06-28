'use client';

import { useState } from 'react';
import { usePortfolioData } from '@/lib/hooks/usePortfolioData';
import { ToastProvider, useToast } from '@/app/components/admin/Toast';
import { Save, RotateCcw, Plus, X } from 'lucide-react';
import { ContactData } from '@/lib/data/types';

interface ContactEditorContentProps {
  data: any;
  update: any;
}

function ContactEditorContent({ data, update }: ContactEditorContentProps) {
  const { showToast } = useToast();
  const [contact, setContact] = useState<ContactData>(data.contact);
  const [newPlatform, setNewPlatform] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleSave = () => { update('contact', contact); showToast('Contact info saved!'); };
  const handleReset = () => { setContact(data.contact); showToast('Changes reverted', 'error'); };

  const addSocialLink = () => {
    if (!newPlatform.trim() || !newUrl.trim()) return;
    setContact({ ...contact, socialLinks: [...contact.socialLinks, { platform: newPlatform.trim(), url: newUrl.trim() }] });
    setNewPlatform('');
    setNewUrl('');
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Contact Info</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage your contact information</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-outline" onClick={handleReset}><RotateCcw size={14} style={{ marginRight: '6px', display: 'inline' }} /> Reset</button>
          <button className="admin-btn admin-btn-primary" onClick={handleSave}><Save size={14} style={{ marginRight: '6px', display: 'inline' }} /> Save</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="admin-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>Primary Contact</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label className="admin-label">Email</label><input className="admin-input" type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} /></div>
            <div><label className="admin-label">Phone</label><input className="admin-input" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} /></div>
            <div><label className="admin-label">Location</label><input className="admin-input" value={contact.location} onChange={e => setContact({ ...contact, location: e.target.value })} /></div>
            <div><label className="admin-label">Resume File Path</label><input className="admin-input" value={contact.resumeFile} onChange={e => setContact({ ...contact, resumeFile: e.target.value })} /></div>
          </div>
        </div>

        <div className="admin-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>Social Profiles</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            <div><label className="admin-label">LinkedIn</label><input className="admin-input" value={contact.linkedin} onChange={e => setContact({ ...contact, linkedin: e.target.value })} /></div>
            <div><label className="admin-label">GitHub</label><input className="admin-input" value={contact.github} onChange={e => setContact({ ...contact, github: e.target.value })} /></div>
          </div>
        </div>

        <div className="admin-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>Additional Social Links</h3>
          {contact.socialLinks.map((link, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
              <input className="admin-input" value={link.platform} readOnly style={{ width: '150px', opacity: 0.7 }} />
              <input className="admin-input" value={link.url} readOnly style={{ flex: 1, opacity: 0.7 }} />
              <button onClick={() => setContact({ ...contact, socialLinks: contact.socialLinks.filter((_, j) => j !== i) })} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={14} /></button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '8px' }}>
            <input className="admin-input" value={newPlatform} onChange={e => setNewPlatform(e.target.value)} placeholder="Platform name" style={{ width: '150px' }} />
            <input className="admin-input" value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="URL" style={{ flex: 1 }} />
            <button className="admin-btn admin-btn-primary" onClick={addSocialLink} style={{ flexShrink: 0 }}><Plus size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactEditor() {
  const { data, update, isLoaded } = usePortfolioData();

  if (!isLoaded) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '16px' }}>
        <div className="loading-initials" style={{ fontSize: '2rem' }}>YM</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading contact info...</div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <ContactEditorContent data={data} update={update} />
    </ToastProvider>
  );
}
