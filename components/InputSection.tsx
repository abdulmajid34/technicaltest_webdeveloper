'use client';

import { useState } from 'react';

interface InputSectionProps {
  onSearch: (handles: { tiktok: string; youtube: string; instagram: string }) => void;
  onRefresh: () => void;
  loading: boolean;
}

export default function InputSection({ onSearch, onRefresh, loading }: InputSectionProps) {
  const [tiktok, setTiktok] = useState('');
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ tiktok, youtube, instagram });
  };

  return (
    <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8, fontSize: '0.9rem' }}>TikTok Username</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="@username" 
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8, fontSize: '0.9rem' }}>YouTube Channel</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Channel Name" 
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8, fontSize: '0.9rem' }}>Instagram Username</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="@username" 
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
            style={{ flex: 1, opacity: loading ? 0.5 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            Fetch Data
          </button>
          <button 
            type="button" 
            onClick={onRefresh} 
            className="btn-primary" 
            disabled={loading}
            style={{ 
              opacity: loading ? 0.5 : 1, 
              cursor: loading ? 'not-allowed' : 'pointer', 
              background: 'rgba(255, 255, 255, 0.1)', 
              border: '1px solid var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={loading ? 'animate-spin' : ''}>
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
