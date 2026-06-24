'use client';

import { useState } from 'react';
import { usePortfolioData } from '@/lib/hooks/usePortfolioData';
import { ToastProvider, useToast } from '@/app/components/admin/Toast';
import { generateId } from '@/lib/utils/storage';
import { Save, Plus, Pencil, Trash2, X } from 'lucide-react';
import { EducationItem } from '@/lib/data/types';

const emptyEdu: EducationItem = { id: '', degree: '', institution: '', location: '', startDate: '', endDate: '', grade: '', coursework: [], achievements: [] };

function EducationManagerContent() {
  const { data, update } = usePortfolioData();
  const { showToast } = useToast();
  const [items, setItems] = useState<EducationItem[]>(data.education);
  const [editItem, setEditItem] = useState<EducationItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newCourse, setNewCourse] = useState('');

  const handleSave = () => { update('education', items); showToast('Education saved!'); };
  const openAdd = () => { setEditItem({ ...emptyEdu, id: generateId('edu') }); setIsAdding(true); };
  const openEdit = (item: EducationItem) => { setEditItem({ ...item }); setIsAdding(false); };
  const saveItem = () => {
    if (!editItem) return;
    if (isAdding) setItems([...items, editItem]);
    else setItems(items.map(i => i.id === editItem.id ? editItem : i));
    setEditItem(null);
    showToast(isAdding ? 'Education added!' : 'Education updated!');
  };
  const deleteItem = (id: string) => { setItems(items.filter(i => i.id !== id)); showToast('Deleted', 'error'); };

  const addCourse = () => {
    if (!editItem || !newCourse.trim()) return;
    setEditItem({ ...editItem, coursework: [...editItem.coursework, newCourse.trim()] });
    setNewCourse('');
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Education</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{items.length} entries</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-outline" onClick={openAdd}><Plus size={14} style={{ marginRight: '6px', display: 'inline' }} /> Add New</button>
          <button className="admin-btn admin-btn-primary" onClick={handleSave}><Save size={14} style={{ marginRight: '6px', display: 'inline' }} /> Save All</button>
        </div>
      </div>

      {editItem && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', padding: '24px' }} onClick={e => { if (e.target === e.currentTarget) setEditItem(null); }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '600px', maxHeight: '85vh', overflowY: 'auto', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{isAdding ? 'Add' : 'Edit'} Education</h2>
              <button onClick={() => setEditItem(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div><label className="admin-label">Degree</label><input className="admin-input" value={editItem.degree} onChange={e => setEditItem({ ...editItem, degree: e.target.value })} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div><label className="admin-label">Institution</label><input className="admin-input" value={editItem.institution} onChange={e => setEditItem({ ...editItem, institution: e.target.value })} /></div>
                <div><label className="admin-label">Location</label><input className="admin-input" value={editItem.location} onChange={e => setEditItem({ ...editItem, location: e.target.value })} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div><label className="admin-label">Start Date</label><input className="admin-input" value={editItem.startDate} onChange={e => setEditItem({ ...editItem, startDate: e.target.value })} /></div>
                <div><label className="admin-label">End Date</label><input className="admin-input" value={editItem.endDate} onChange={e => setEditItem({ ...editItem, endDate: e.target.value })} /></div>
                <div><label className="admin-label">Grade</label><input className="admin-input" value={editItem.grade} onChange={e => setEditItem({ ...editItem, grade: e.target.value })} /></div>
              </div>
              <div>
                <label className="admin-label">Coursework</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                  {editItem.coursework.map((c, i) => (
                    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px', background: 'var(--bg-surface-hover)', fontSize: '0.8rem', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>
                      {c} <button onClick={() => setEditItem({ ...editItem, coursework: editItem.coursework.filter((_, j) => j !== i) })} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input className="admin-input" value={newCourse} onChange={e => setNewCourse(e.target.value)} placeholder="Add course..." onKeyDown={e => e.key === 'Enter' && addCourse()} />
                  <button className="admin-btn admin-btn-primary" onClick={addCourse} style={{ flexShrink: 0 }}><Plus size={14} /></button>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button className="admin-btn admin-btn-outline" onClick={() => setEditItem(null)}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={saveItem}>{isAdding ? 'Add' : 'Update'}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map(item => (
          <div key={item.id} className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>{item.degree}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{item.institution} • {item.startDate} — {item.endDate} • {item.grade}</p>
            </div>
            <button onClick={() => openEdit(item)} className="admin-btn admin-btn-outline" style={{ padding: '6px 12px' }}><Pencil size={14} /></button>
            <button onClick={() => deleteItem(item.id)} className="admin-btn admin-btn-danger" style={{ padding: '6px 12px' }}><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EducationManager() {
  return <ToastProvider><EducationManagerContent /></ToastProvider>;
}
