'use client';

import { useState } from 'react';
import { usePortfolioData } from '@/lib/hooks/usePortfolioData';
import { ToastProvider, useToast } from '@/app/components/admin/Toast';
import { generateId } from '@/lib/utils/storage';
import { Save, Plus, Pencil, Trash2, X } from 'lucide-react';
import { ProjectItem } from '@/lib/data/types';

const emptyProject: ProjectItem = {
  id: '', title: '', description: '', technologies: [], impact: '', achievements: [], image: '', type: 'technical',
};

interface ProjectsManagerContentProps {
  data: any;
  update: any;
}

function ProjectsManagerContent({ data, update }: ProjectsManagerContentProps) {
  const { showToast } = useToast();
  const [items, setItems] = useState<ProjectItem[]>(data.projects);
  const [editItem, setEditItem] = useState<ProjectItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTech, setNewTech] = useState('');
  const [newAch, setNewAch] = useState('');

  const handleSave = () => {
    update('projects', items);
    showToast('Projects saved successfully!');
  };

  const openAdd = () => { setEditItem({ ...emptyProject, id: generateId('proj') }); setIsAdding(true); };
  const openEdit = (item: ProjectItem) => { setEditItem({ ...item }); setIsAdding(false); };

  const saveItem = () => {
    if (!editItem) return;
    if (isAdding) setItems([...items, editItem]);
    else setItems(items.map(i => i.id === editItem.id ? editItem : i));
    setEditItem(null);
    showToast(isAdding ? 'Project added!' : 'Project updated!');
  };

  const deleteItem = (id: string) => { setItems(items.filter(i => i.id !== id)); showToast('Project deleted', 'error'); };

  const addTech = () => {
    if (!editItem || !newTech.trim()) return;
    setEditItem({ ...editItem, technologies: [...editItem.technologies, newTech.trim()] });
    setNewTech('');
  };

  const addAchievement = () => {
    if (!editItem || !newAch.trim()) return;
    setEditItem({ ...editItem, achievements: [...editItem.achievements, newAch.trim()] });
    setNewAch('');
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Projects</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{items.length} projects</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-outline" onClick={openAdd}><Plus size={14} style={{ marginRight: '6px', display: 'inline' }} /> Add New</button>
          <button className="admin-btn admin-btn-primary" onClick={handleSave}><Save size={14} style={{ marginRight: '6px', display: 'inline' }} /> Save All</button>
        </div>
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', padding: '24px' }} onClick={e => { if (e.target === e.currentTarget) setEditItem(null); }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '600px', maxHeight: '85vh', overflowY: 'auto', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{isAdding ? 'Add Project' : 'Edit Project'}</h2>
              <button onClick={() => setEditItem(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div><label className="admin-label">Title</label><input className="admin-input" value={editItem.title} onChange={e => setEditItem({ ...editItem, title: e.target.value })} /></div>
              <div><label className="admin-label">Description</label><textarea className="admin-textarea" value={editItem.description} onChange={e => setEditItem({ ...editItem, description: e.target.value })} rows={4} /></div>
              <div><label className="admin-label">Impact</label><input className="admin-input" value={editItem.impact} onChange={e => setEditItem({ ...editItem, impact: e.target.value })} /></div>
              <div>
                <label className="admin-label">Type</label>
                <select className="admin-input" value={editItem.type} onChange={e => setEditItem({ ...editItem, type: e.target.value as ProjectItem['type'] })} style={{ cursor: 'pointer' }}>
                  <option value="technical">Technical</option>
                  <option value="academic">Academic</option>
                  <option value="social">Social Impact</option>
                </select>
              </div>

              {/* Technologies */}
              <div>
                <label className="admin-label">Technologies</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                  {editItem.technologies.map((t, i) => (
                    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px', background: 'var(--bg-surface-hover)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {t}
                      <button onClick={() => setEditItem({ ...editItem, technologies: editItem.technologies.filter((_, j) => j !== i) })} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0', marginLeft: '2px' }}><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input className="admin-input" value={newTech} onChange={e => setNewTech(e.target.value)} placeholder="Add technology..." onKeyDown={e => e.key === 'Enter' && addTech()} />
                  <button className="admin-btn admin-btn-primary" onClick={addTech} style={{ flexShrink: 0 }}><Plus size={14} /></button>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <label className="admin-label">Achievements</label>
                {editItem.achievements.map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <input className="admin-input" value={a} onChange={e => { const achs = [...editItem.achievements]; achs[i] = e.target.value; setEditItem({ ...editItem, achievements: achs }); }} />
                    <button onClick={() => setEditItem({ ...editItem, achievements: editItem.achievements.filter((_, j) => j !== i) })} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', flexShrink: 0 }}><X size={14} /></button>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input className="admin-input" value={newAch} onChange={e => setNewAch(e.target.value)} placeholder="Add achievement..." onKeyDown={e => e.key === 'Enter' && addAchievement()} />
                  <button className="admin-btn admin-btn-primary" onClick={addAchievement} style={{ flexShrink: 0 }}><Plus size={14} /></button>
                </div>
              </div>

              <div>
                <label className="admin-label">Project Image</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label className="admin-label" style={{ fontSize: '0.75rem', textTransform: 'none', color: 'var(--text-muted)' }}>Upload File</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="admin-input" 
                      style={{ cursor: 'pointer' }}
                      onChange={async e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            showToast('Uploading image...');
                            const formData = new FormData();
                            formData.append('file', file);
                            
                            const res = await fetch('/api/upload', {
                              method: 'POST',
                              body: formData,
                            });
                            
                            const result = await res.json();
                            if (result.success && result.filePath) {
                              setEditItem(prev => prev ? { ...prev, image: result.filePath } : null);
                              showToast('Project image uploaded successfully!');
                            } else {
                              showToast(result.error || 'Upload failed', 'error');
                            }
                          } catch (err) {
                            console.error('Error uploading file:', err);
                            showToast('Error uploading file', 'error');
                          }
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label className="admin-label" style={{ fontSize: '0.75rem', textTransform: 'none', color: 'var(--text-muted)' }}>Or Image URL / Base64</label>
                    <input className="admin-input" value={editItem.image} onChange={e => setEditItem({ ...editItem, image: e.target.value })} placeholder="Image URL or base64" />
                  </div>
                  {editItem.image && (
                    <div style={{ marginTop: '4px' }}>
                      <span className="admin-label" style={{ fontSize: '0.75rem' }}>Preview</span>
                      <img 
                        src={editItem.image} 
                        alt="Project Preview" 
                        style={{ width: '100%', maxHeight: '150px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.05)' }} 
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
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

      {/* Project cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {items.map(item => (
          <div key={item.id} className="admin-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, background: 'var(--bg-surface-hover)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{item.type}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={() => openEdit(item)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Pencil size={14} /></button>
                <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
              </div>
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5 }}>{item.description.substring(0, 100)}...</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '10px' }}>
              {item.technologies.slice(0, 3).map(t => (
                <span key={t} style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary-light)' }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsManager() {
  const { data, update, isLoaded } = usePortfolioData();

  if (!isLoaded) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '16px' }}>
        <div className="loading-initials" style={{ fontSize: '2rem' }}>YM</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading projects...</div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <ProjectsManagerContent data={data} update={update} />
    </ToastProvider>
  );
}
