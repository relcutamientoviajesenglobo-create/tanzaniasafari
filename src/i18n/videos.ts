/**
 * Video Registry — Bilingual metadata for all site videos
 * Usage: import { videos, getVideosByCategory } from '../i18n/videos';
 */
import type { Lang } from './config';

export type VideoCategory =
  | 'serengeti'
  | 'ngorongoro'
  | 'masai'
  | 'lodge'
  | 'balloon'
  | 'wildlife'
  | 'migration';

export interface VideoMeta {
  id: string;
  src: Record<Lang, string>;
  alt: Record<Lang, string>;
  title: Record<Lang, string>;
  duration: number;       // seconds
  width: number;
  height: number;
  category: VideoCategory;
  /** Pages where this video should appear (slug paths) */
  pages: string[];
}

// No videos yet — will be added when media assets are available
export const videos: VideoMeta[] = [];

// ─── Helper functions ──────────────────────────────────

/** Get a single video by its ID */
export function getVideo(id: string): VideoMeta | undefined {
  return videos.find(v => v.id === id);
}

/** Get all videos for a given category */
export function getVideosByCategory(category: VideoCategory): VideoMeta[] {
  return videos.filter(v => v.category === category);
}

/** Get all videos assigned to a specific page path */
export function getVideosForPage(pagePath: string): VideoMeta[] {
  return videos.filter(v => v.pages.includes(pagePath));
}

/** Get the localized src for a video */
export function getVideoSrc(id: string, lang: Lang): string {
  const v = getVideo(id);
  return v ? v.src[lang] : '';
}

/** Get the localized alt text for a video */
export function getVideoAlt(id: string, lang: Lang): string {
  const v = getVideo(id);
  return v ? v.alt[lang] : '';
}
