'use client';

import { useState } from 'react';
import { usePortfolioData } from '@/lib/hooks/usePortfolioData';
import { ToastProvider, useToast } from '@/app/components/admin/Toast';
import { generateId } from '@/lib/utils/storage';
import { Save, Plus, Pencil, Trash2, X } from 'lucide-react';
import { AchievementItem } from '@/lib/data/types';

const emptyAch: AchievementItem = { id: '', title: '', value: '', description: '', icon: 'TrendingUp' };

interface AchievementsManagerContentProps {
  data: any;
  update: any;
}

function AchievementsManagerContent({ data, update }: AchievementsManagerContentProps) {
  const { showToast } = useToast();
  const [items, setItems] = useState<AchievementItem[]>(data.achievements);
  const [editItem, setEditItem] = useState<AchievementItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = () => { update('achievements', items); showToast('Achievements saved!'); };
  const openAdd = () => { setEditItem({ ...emptyAch, id: generateId('ach') }); setIsAdding(true); };
  const openEdit = (item: AchievementItem) => { setEditItem({ ...item }); setIsAdding(false); };
  const saveItem = () => {
    if (!editItem) return;
    if (isAdding) setItems([...items, editItem]);
    else setItems(items.map(i => i.id === editItem.id ? editItem : i));
    setEditItem(null);
    showToast(isAdding ? 'Achievement added!' : 'Achievement updated!');
  };
  const deleteItem = (id: string) => { setItems(items.filter(i => i.id !== id)); showToast('Deleted', 'error'); };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Achievements</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{items.length} achievements</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-outline" onClick={openAdd}><Plus size={14} style={{ marginRight: '6px', display: 'inline' }} /> Add</button>
          <button className="admin-btn admin-btn-primary" onClick={handleSave}><Save size={14} style={{ marginRight: '6px', display: 'inline' }} /> Save All</button>
        </div>
      </div>

      {editItem && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', padding: '24px' }} onClick={e => { if (e.target === e.currentTarget) setEditItem(null); }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '500px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{isAdding ? 'Add' : 'Edit'} Achievement</h2>
              <button onClick={() => setEditItem(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div><label className="admin-label">Title</label><input className="admin-input" value={editItem.title} onChange={e => setEditItem({ ...editItem, title: e.target.value })} placeholder="e.g. Sales Growth" /></div>
                <div><label className="admin-label">Value</label><input className="admin-input" value={editItem.value} onChange={e => setEditItem({ ...editItem, value: e.target.value })} placeholder="e.g. 30%+" /></div>
              </div>
              <div><label className="admin-label">Description</label><textarea className="admin-textarea" value={editItem.description} onChange={e => setEditItem({ ...editItem, description: e.target.value })} rows={2} /></div>
              <div>
                <label className="admin-label">Icon</label>
                <select className="admin-input" value={editItem.icon} onChange={e => setEditItem({ ...editItem, icon: e.target.value })} style={{ cursor: 'pointer' }}>
                  <option value="TrendingUp">Trending Up</option><option value="Award">Award</option><option value="Briefcase">Briefcase</option><option value="FolderOpen">Folder</option><option value="BarChart3">Chart</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button className="admin-btn admin-btn-outline" onClick={() => setEditItem(null)}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={saveItem}>{isAdding ? 'Add' : 'Update'}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {items.map(item => (
          <div key={item.id} className="admin-card" style={{ textAlign: 'center', padding: '24px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '4px' }}>
              <button onClick={() => openEdit(item)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Pencil size={12} /></button>
              <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={12} /></button>
            </div>
            <p className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '4px' }}>{item.value}</p>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>{item.title}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AchievementsManager() {
  const { data, update, isLoaded } = usePortfolioData();

  if (!isLoaded) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '16px' }}>
        <div className="loading-initials" style={{ fontSize: '2rem' }}>YM</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading achievements...</div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <AchievementsManagerContent data={data} update={update} />
    </ToastProvider>
  );
}
