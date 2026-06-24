'use client';

import { useState } from 'react';
import { usePortfolioData } from '@/lib/hooks/usePortfolioData';
import { ToastProvider, useToast } from '@/app/components/admin/Toast';
import { generateId } from '@/lib/utils/storage';
import { Save, Plus, Pencil, Trash2, X } from 'lucide-react';
import { CertificationItem } from '@/lib/data/types';

const emptyCert: CertificationItem = { id: '', name: '', issuer: '', year: '', category: 'Finance' };

function CertificationsManagerContent() {
  const { data, update } = usePortfolioData();
  const { showToast } = useToast();
  const [items, setItems] = useState<CertificationItem[]>(data.certifications);
  const [editItem, setEditItem] = useState<CertificationItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = () => { update('certifications', items); showToast('Certifications saved!'); };
  const openAdd = () => { setEditItem({ ...emptyCert, id: generateId('cert') }); setIsAdding(true); };
  const openEdit = (item: CertificationItem) => { setEditItem({ ...item }); setIsAdding(false); };
  const saveItem = () => {
    if (!editItem) return;
    if (isAdding) setItems([...items, editItem]);
    else setItems(items.map(i => i.id === editItem.id ? editItem : i));
    setEditItem(null);
    showToast(isAdding ? 'Certification added!' : 'Certification updated!');
  };
  const deleteItem = (id: string) => { setItems(items.filter(i => i.id !== id)); showToast('Deleted', 'error'); };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Certifications</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{items.length} certifications</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-outline" onClick={openAdd}><Plus size={14} style={{ marginRight: '6px', display: 'inline' }} /> Add New</button>
          <button className="admin-btn admin-btn-primary" onClick={handleSave}><Save size={14} style={{ marginRight: '6px', display: 'inline' }} /> Save All</button>
        </div>
      </div>

      {editItem && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', padding: '24px' }} onClick={e => { if (e.target === e.currentTarget) setEditItem(null); }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '500px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{isAdding ? 'Add' : 'Edit'} Certification</h2>
              <button onClick={() => setEditItem(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div><label className="admin-label">Name</label><input className="admin-input" value={editItem.name} onChange={e => setEditItem({ ...editItem, name: e.target.value })} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div><label className="admin-label">Issuer</label><input className="admin-input" value={editItem.issuer} onChange={e => setEditItem({ ...editItem, issuer: e.target.value })} /></div>
                <div><label className="admin-label">Year</label><input className="admin-input" value={editItem.year} onChange={e => setEditItem({ ...editItem, year: e.target.value })} /></div>
              </div>
              <div>
                <label className="admin-label">Category</label>
                <select className="admin-input" value={editItem.category} onChange={e => setEditItem({ ...editItem, category: e.target.value })} style={{ cursor: 'pointer' }}>
                  <option value="Finance">Finance</option><option value="AI">AI</option><option value="Language">Language</option><option value="Marketing">Marketing</option><option value="Tools">Tools</option>
                </select>
              </div>
              <div><label className="admin-label">Link (optional)</label><input className="admin-input" value={editItem.link || ''} onChange={e => setEditItem({ ...editItem, link: e.target.value })} placeholder="https://..." /></div>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button className="admin-btn admin-btn-outline" onClick={() => setEditItem(null)}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={saveItem}>{isAdding ? 'Add' : 'Update'}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map(item => (
          <div key={item.id} className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '2px' }}>{item.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{item.issuer} • {item.year}</p>
            </div>
            <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, background: 'var(--bg-surface-hover)', color: 'var(--text-muted)' }}>{item.category}</span>
            <button onClick={() => openEdit(item)} className="admin-btn admin-btn-outline" style={{ padding: '6px 12px' }}><Pencil size={14} /></button>
            <button onClick={() => deleteItem(item.id)} className="admin-btn admin-btn-danger" style={{ padding: '6px 12px' }}><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CertificationsManager() {
  return <ToastProvider><CertificationsManagerContent /></ToastProvider>;
}
