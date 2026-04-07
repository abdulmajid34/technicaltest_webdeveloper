import { SocialAccount, SocialContent } from './types';

// Mock data generator for demo purposes
const generateMockContent = (count: number, platform: string): SocialContent[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${platform}-post-${i}`,
    title: `${platform} Video ${i + 1}`,
    views: Math.floor(Math.random() * 1000000) + 1000,
    thumbnailUrl: `https://picsum.photos/seed/${platform}-${i}/400/600`, // Using dummy placeholder
    url: '#',
    date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  }));
};

const mockProfiles = {
  TikTok: "https://api.dicebear.com/7.x/avataaars/svg?seed=tiktok",
  YouTube: "https://api.dicebear.com/7.x/avataaars/svg?seed=youtube",
  Instagram: "https://api.dicebear.com/7.x/avataaars/svg?seed=instagram",
};

export async function fetchSocialData(
  platform: 'TikTok' | 'YouTube' | 'Instagram',
  handle: string
): Promise<SocialAccount> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

  const content = generateMockContent(5, platform);
  const totalViews = content.reduce((acc, curr) => acc + curr.views, 0) * (Math.floor(Math.random() * 10) + 5);

  return {
    platform,
    handle,
    displayName: handle.startsWith('@') ? handle : `@${handle}`,
    profilePic: mockProfiles[platform],
    totalViews,
    latestContent: content,
  };
}
