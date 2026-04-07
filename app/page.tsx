'use client';

import { useState, useCallback } from 'react';
import { SocialAccount } from '@/lib/types';
import { fetchSocialData } from '@/lib/api-mock';
import InputSection from '@/components/InputSection';
import SocialCard from '@/components/SocialCard';

export default function Home() {
  const [data, setData] = useState<{
    tiktok: SocialAccount | null;
    youtube: SocialAccount | null;
    instagram: SocialAccount | null;
  }>({
    tiktok: null,
    youtube: null,
    instagram: null,
  });

  const [handles, setHandles] = useState({
    tiktok: '',
    youtube: '',
    instagram: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    tiktok?: string;
    youtube?: string;
    instagram?: string;
  }>({});

  const handleSearch = async (freshHandles: { tiktok: string; youtube: string; instagram: string }) => {
    setHandles(freshHandles);
    setLoading(true);
    setErrors({});

    const fetchPromises = [];

    if (freshHandles.tiktok) {
      fetchPromises.push(
        fetchSocialData('TikTok', freshHandles.tiktok)
          .then((res) => setData((prev) => ({ ...prev, tiktok: res })))
          .catch(() => setErrors((prev) => ({ ...prev, tiktok: 'TikTok fetch failed' })))
      );
    }
    if (freshHandles.youtube) {
      fetchPromises.push(
        fetchSocialData('YouTube', freshHandles.youtube)
          .then((res) => setData((prev) => ({ ...prev, youtube: res })))
          .catch(() => setErrors((prev) => ({ ...prev, youtube: 'YouTube fetch failed' })))
      );
    }
    if (freshHandles.instagram) {
      fetchPromises.push(
        fetchSocialData('Instagram', freshHandles.instagram)
          .then((res) => setData((prev) => ({ ...prev, instagram: res })))
          .catch(() => setErrors((prev) => ({ ...prev, instagram: 'Instagram fetch failed' })))
      );
    }

    await Promise.all(fetchPromises);
    setLoading(false);
  };

  const handleHandlesChange = useCallback((newHandles: { tiktok: string; youtube: string; instagram: string }) => {
    setHandles(newHandles);
    
    // Clear data if handle is empty in real-time
    setData((prev) => ({
      tiktok: newHandles.tiktok ? prev.tiktok : null,
      youtube: newHandles.youtube ? prev.youtube : null,
      instagram: newHandles.instagram ? prev.instagram : null,
    }));
    
    // Clear errors as well
    setErrors((prev) => ({
      ...prev,
      tiktok: newHandles.tiktok ? prev.tiktok : undefined,
      youtube: newHandles.youtube ? prev.youtube : undefined,
      instagram: newHandles.instagram ? prev.instagram : undefined,
    }));
  }, []);

  const handleRefresh = useCallback(() => {
    if (handles.tiktok || handles.youtube || handles.instagram) {
      handleSearch(handles);
    }
  }, [handles]);

  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 900 }}>
          Social View Dashboard
        </h1>
        <p style={{ opacity: 0.7, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Analyze your social media performance across platforms in one place.
        </p>
      </header>

      <InputSection 
        onSearch={handleSearch} 
        onRefresh={handleRefresh} 
        onHandlesChange={handleHandlesChange}
        loading={loading} 
      />

      <section className="grid grid-cols-1 grid-cols-2 grid-cols-3">
        <SocialCard 
          platform="TikTok" 
          data={data.tiktok} 
          loading={loading && !!handles.tiktok && !data.tiktok} 
          error={errors.tiktok}
        />
        <SocialCard 
          platform="YouTube" 
          data={data.youtube} 
          loading={loading && !!handles.youtube && !data.youtube} 
          error={errors.youtube}
        />
        <SocialCard 
          platform="Instagram" 
          data={data.instagram} 
          loading={loading && !!handles.instagram && !data.instagram} 
          error={errors.instagram}
        />
      </section>

      <footer style={{ marginTop: '5rem', padding: '2rem', borderTop: '1px solid var(--card-border)', textAlign: 'center', opacity: 0.5, fontSize: '0.9rem' }}>
        <p>&copy; 2026 Social Metric Analyzer • Technical Test Web Developer</p>
        <p style={{ marginTop: '0.5rem' }}>Using simulated data for demonstration purposes.</p>
      </footer>
    </main>
  );
}
