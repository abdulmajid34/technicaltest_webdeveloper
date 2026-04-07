'use client';

import { SocialAccount } from '@/lib/types';
import Image from 'next/image';

interface SocialCardProps {
  data: SocialAccount | null;
  loading: boolean;
  platform: 'TikTok' | 'YouTube' | 'Instagram';
  error?: string | null;
}

const colorMap = {
  TikTok: 'linear-gradient(135deg, #25f4ee 0%, #fe2c55 100%)',
  YouTube: 'linear-gradient(135deg, #FF0000 0%, #282828 100%)',
  Instagram: 'linear-gradient(135deg, #405DE6 0%, #5851DB 25%, #833AB4 50%, #C13584 75%, #E1306C 100%)',
};

export default function SocialCard({ data, loading, platform, error }: SocialCardProps) {
  if (loading) {
    return (
      <div className="glass animate-fade-in" style={{ padding: '2rem', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ opacity: 0.6 }}>Loading {platform} data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass animate-fade-in" style={{ padding: '2rem', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <p style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>{error}</p>
        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Check handle and try again.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="glass animate-fade-in" style={{ padding: '2rem', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
        <div style={{ width: '60px', height: '60px', background: 'var(--card-border)', borderRadius: '50%', marginBottom: '1rem' }}></div>
        <p>No {platform} account entered</p>
      </div>
    );
  }

  return (
    <div className="glass animate-fade-in" style={{ padding: '2rem', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid white', background: 'var(--card-border)' }}>
          <img 
            src={data.profilePic} 
            alt={data.displayName} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem' }}>{data.displayName}</h3>
          <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>{platform} Account</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.9rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Views</p>
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          {data.totalViews.toLocaleString()}
        </h2>
      </div>

      <div>
        <h4 style={{ marginBottom: '1rem', opacity: 0.8 }}>Latest Content</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {data.latestContent.map((content) => (
            <div 
              key={content.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '0.75rem', 
                background: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, background: 'var(--card-border)' }}>
                <img src={content.thumbnailUrl} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{content.title}</div>
                <div style={{ opacity: 0.5, fontSize: '0.8rem' }}>{content.date}</div>
              </div>
              <div style={{ fontWeight: 700, color: 'var(--accent)' }}>
                {content.views.toLocaleString()} <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>views</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
