export interface SocialContent {
  id: string;
  title?: string;
  views: number;
  thumbnailUrl: string;
  url: string;
  date?: string;
}

export interface SocialAccount {
  platform: 'TikTok' | 'YouTube' | 'Instagram';
  handle: string;
  displayName: string;
  profilePic: string;
  totalViews: number;
  latestContent: SocialContent[];
}

export interface DashboardData {
  tiktok: SocialAccount | null;
  youtube: SocialAccount | null;
  instagram: SocialAccount | null;
}
