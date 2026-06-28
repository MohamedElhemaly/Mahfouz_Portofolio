'use client';

import { useState } from 'react';
import { usePortfolioData } from '@/lib/hooks/usePortfolioData';
import { ToastProvider, useToast } from '@/app/components/admin/Toast';
import { generateId } from '@/lib/utils/storage';
import { Save, Plus, Pencil, Trash2, X } from 'lucide-react';
import { SkillCategory, SkillItem } from '@/lib/data/types';

interface SkillsManagerContentProps {
  data: any;
  update: any;
}

function SkillsManagerContent({ data, update }: SkillsManagerContentProps) {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<SkillCategory[]>(data.skillCategories);
  const [editCat, setEditCat] = useState<string | null>(null);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(75);
  const [newCatName, setNewCatName] = useState('');

  const handleSave = () => {
    update('skillCategories', categories);
    showToast('Skills saved successfully!');
  };

  const addCategory = () => {
    if (!newCatName.trim()) return;
    const newCat: SkillCategory = {
      id: generateId('cat'),
      name: newCatName.trim(),
      icon: 'Zap',
      skills: [],
    };
    setCategories([...categories, newCat]);
    setNewCatName('');
    showToast('Category added!');
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
    showToast('Category deleted', 'error');
  };

  const addSkill = (catId: string) => {
    if (!newSkillName.trim()) return;
    const cat = categories.find(c => c.id === catId);
    if (!cat) return;

    const newSkill: SkillItem = {
      id: generateId('skill'),
      name: newSkillName.trim(),
      level: newSkillLevel,
      category: cat.name,
    };

    setCategories(categories.map(c =>
      c.id === catId ? { ...c, skills: [...c.skills, newSkill] } : c
    ));
    setNewSkillName('');
    setNewSkillLevel(75);
  };

  const deleteSkill = (catId: string, skillId: string) => {
    setCategories(categories.map(c =>
      c.id === catId ? { ...c, skills: c.skills.filter(s => s.id !== skillId) } : c
    ));
  };

  const updateSkillLevel = (catId: string, skillId: string, level: number) => {
    setCategories(categories.map(c =>
      c.id === catId
        ? { ...c, skills: c.skills.map(s => s.id === skillId ? { ...s, level } : s) }
        : c
    ));
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Skills</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {categories.length} categories, {categories.reduce((a, c) => a + c.skills.length, 0)} skills
          </p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={handleSave}>
          <Save size={14} style={{ marginRight: '6px', display: 'inline' }} /> Save All
        </button>
      </div>

      {/* Add category */}
      <div className="admin-card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>Add Category</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input className="admin-input" value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="Category name..." onKeyDown={e => e.key === 'Enter' && addCategory()} />
          <button className="admin-btn admin-btn-primary" onClick={addCategory} style={{ flexShrink: 0 }}>
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Categories */}
      {categories.map(cat => (
        <div key={cat.id} className="admin-card" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{cat.name}</h3>
            <button onClick={() => deleteCategory(cat.id)} className="admin-btn admin-btn-danger" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
              <Trash2 size={12} style={{ marginRight: '4px', display: 'inline' }} /> Delete Category
            </button>
          </div>

          {/* Skills list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {cat.skills.map(skill => (
              <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ flex: 1, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{skill.name}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={e => updateSkillLevel(cat.id, skill.id, parseInt(e.target.value))}
                  style={{ width: '120px', accentColor: 'var(--accent-primary)' }}
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", minWidth: '36px', textAlign: 'right' }}>
                  {skill.level}%
                </span>
                <button onClick={() => deleteSkill(cat.id, skill.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Add skill to category */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label className="admin-label">Skill Name</label>
              <input className="admin-input" value={editCat === cat.id ? newSkillName : ''} onChange={e => { setEditCat(cat.id); setNewSkillName(e.target.value); }} placeholder="New skill..." onFocus={() => setEditCat(cat.id)} />
            </div>
            <div style={{ width: '100px' }}>
              <label className="admin-label">Level</label>
              <input className="admin-input" type="number" min="0" max="100" value={editCat === cat.id ? newSkillLevel : 75} onChange={e => { setEditCat(cat.id); setNewSkillLevel(parseInt(e.target.value) || 0); }} onFocus={() => setEditCat(cat.id)} />
            </div>
            <button className="admin-btn admin-btn-primary" onClick={() => addSkill(cat.id)} style={{ padding: '10px 16px' }}>
              <Plus size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SkillsManager() {
  const { data, update, isLoaded } = usePortfolioData();

  if (!isLoaded) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '16px' }}>
        <div className="loading-initials" style={{ fontSize: '2rem' }}>YM</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading skills...</div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <SkillsManagerContent data={data} update={update} />
    </ToastProvider>
  );
}
