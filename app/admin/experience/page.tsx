'use client';

import { useState } from 'react';
import { usePortfolioData } from '@/lib/hooks/usePortfolioData';
import { ToastProvider, useToast } from '@/app/components/admin/Toast';
import { generateId } from '@/lib/utils/storage';
import { Save, Plus, Pencil, Trash2, X } from 'lucide-react';
import { ExperienceItem } from '@/lib/data/types';

const emptyExp: ExperienceItem = {
  id: '', title: '', company: '', location: '', startDate: '', endDate: '', description: [''], type: 'work',
};

function ExperienceManagerContent() {
  const { data, update } = usePortfolioData();
  const { showToast } = useToast();
  const [items, setItems] = useState<ExperienceItem[]>(data.experience);
  const [editItem, setEditItem] = useState<ExperienceItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = () => {
    update('experience', items);
    showToast('Experience saved successfully!');
  };

  const openAdd = () => {
    setEditItem({ ...emptyExp, id: generateId('exp') });
    setIsAdding(true);
  };

  const openEdit = (item: ExperienceItem) => {
    setEditItem({ ...item });
    setIsAdding(false);
  };

  const saveItem = () => {
    if (!editItem) return;
    if (isAdding) {
      setItems([editItem, ...items]);
    } else {
      setItems(items.map(i => i.id === editItem.id ? editItem : i));
    }
    setEditItem(null);
    showToast(isAdding ? 'Experience added!' : 'Experience updated!');
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
    showToast('Experience deleted', 'error');
  };

  const updateDesc = (index: number, value: string) => {
    if (!editItem) return;
    const desc = [...editItem.description];
    desc[index] = value;
    setEditItem({ ...editItem, description: desc });
  };

  const addDesc = () => {
    if (!editItem) return;
    setEditItem({ ...editItem, description: [...editItem.description, ''] });
  };

  const removeDesc = (index: number) => {
    if (!editItem) return;
    setEditItem({ ...editItem, description: editItem.description.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Experience</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{items.length} experience items</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-outline" onClick={openAdd}>
            <Plus size={14} style={{ marginRight: '6px', display: 'inline' }} /> Add New
          </button>
          <button className="admin-btn admin-btn-primary" onClick={handleSave}>
            <Save size={14} style={{ marginRight: '6px', display: 'inline' }} /> Save All
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', padding: '24px' }} onClick={e => { if (e.target === e.currentTarget) setEditItem(null); }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{isAdding ? 'Add Experience' : 'Edit Experience'}</h2>
              <button onClick={() => setEditItem(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="admin-label">Title</label>
                <input className="admin-input" value={editItem.title} onChange={e => setEditItem({ ...editItem, title: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="admin-label">Company</label>
                  <input className="admin-input" value={editItem.company} onChange={e => setEditItem({ ...editItem, company: e.target.value })} />
                </div>
                <div>
                  <label className="admin-label">Location</label>
                  <input className="admin-input" value={editItem.location} onChange={e => setEditItem({ ...editItem, location: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="admin-label">Start Date</label>
                  <input className="admin-input" value={editItem.startDate} onChange={e => setEditItem({ ...editItem, startDate: e.target.value })} placeholder="e.g. Nov 2025" />
                </div>
                <div>
                  <label className="admin-label">End Date</label>
                  <input className="admin-input" value={editItem.endDate} onChange={e => setEditItem({ ...editItem, endDate: e.target.value })} placeholder="e.g. Present" />
                </div>
              </div>
              <div>
                <label className="admin-label">Type</label>
                <select className="admin-input" value={editItem.type} onChange={e => setEditItem({ ...editItem, type: e.target.value as ExperienceItem['type'] })} style={{ cursor: 'pointer' }}>
                  <option value="work">Full-time</option>
                  <option value="internship">Internship</option>
                  <option value="training">Training</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
              <div>
                <label className="admin-label">Description Points</label>
                {editItem.description.map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <textarea className="admin-textarea" value={d} onChange={e => updateDesc(i, e.target.value)} rows={2} style={{ minHeight: '60px' }} />
                    {editItem.description.length > 1 && (
                      <button onClick={() => removeDesc(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px', flexShrink: 0 }}><Trash2 size={14} /></button>
                    )}
                  </div>
                ))}
                <button className="admin-btn admin-btn-outline" onClick={addDesc} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                  <Plus size={12} style={{ marginRight: '4px', display: 'inline' }} /> Add Point
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button className="admin-btn admin-btn-outline" onClick={() => setEditItem(null)}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={saveItem}>
                {isAdding ? 'Add' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Items list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map(item => (
          <div key={item.id} className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{item.company} • {item.startDate} — {item.endDate}</p>
            </div>
            <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600, background: 'var(--bg-surface-hover)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              {item.type}
            </span>
            <button onClick={() => openEdit(item)} className="admin-btn admin-btn-outline" style={{ padding: '6px 12px' }}>
              <Pencil size={14} />
            </button>
            <button onClick={() => deleteItem(item.id)} className="admin-btn admin-btn-danger" style={{ padding: '6px 12px' }}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceManager() {
  return <ToastProvider><ExperienceManagerContent /></ToastProvider>;
}
