import { announcements } from '@/content/news';
import { fetchBlueskyPosts } from '@/lib/bluesky';
import { fetchFeeds } from '@/lib/rss';
import type { Locale } from '@/i18n/routes';

// The NeuroTechX news stream behind /news and /feed.xml: announcements written in this repo,
// Content Lab posts from Medium and posts from the NeuroTechX Bluesky account, newest first.
// Each outside source fails soft: if Medium or Bluesky is down, the rest still shows.

export const CONTENT_LAB_FEED = 'https://medium.com/feed/neurotechx';
export const SITE = 'https://neurotechx.org';

export type NewsSource = 'announcement' | 'contentLab' | 'bluesky';

export interface NewsEntry {
  id: string;
  source: NewsSource;
  date: string; // ISO
  title: string;
  summary: string;
  /** English route path (internal) or full URL (external). */
  link: string;
  internal: boolean;
  /** True when the title and summary are in English whatever the page language. */
  english: boolean;
}

const strip = (html: string) =>
  html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();

function shorten(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), max - 20)).trimEnd()}…`;
}

async function contentLab(): Promise<NewsEntry[]> {
  const items = await fetchFeeds([{ name: 'NeuroTechX Content Lab', url: CONTENT_LAB_FEED, type: 'blog' }]).catch(() => []);
  return items
    .filter((i) => i.link && i.link !== '#')
    .map((i) => ({
      id: i.link.split('?')[0],
      source: 'contentLab' as const,
      date: i.pubDate,
      title: i.title,
      summary: shorten(strip(i.contentSnippet ?? ''), 280),
      link: i.link.split('?')[0],
      internal: false,
      english: true,
    }));
}

async function bluesky(): Promise<NewsEntry[]> {
  // Most of the timeline is reposts, which are dropped, so ask for the API's maximum.
  const posts = await fetchBlueskyPosts(100).catch(() => []);
  return posts.map((p) => {
    const text = (p.contentSnippet ?? '').trim();
    // Title: the first line, cut at a word. Card text: the rest, or the whole post if the title was cut.
    const firstLine = text.split('\n')[0].trim();
    const title = shorten(firstLine, 120) || p.title;
    const rest = title === firstLine ? text.slice(firstLine.length) : text;
    return {
      id: p.link,
      source: 'bluesky' as const,
      date: p.pubDate,
      title,
      summary: shorten(rest.trim(), 280),
      link: p.link,
      internal: false,
      english: true,
    };
  });
}

/** Merged news, newest first. */
export async function getNews(lang: Locale, limit = 30): Promise<NewsEntry[]> {
  const own: NewsEntry[] = announcements[lang].map((a) => ({
    id: `${SITE}${a.link}`,
    source: 'announcement',
    date: a.date,
    title: a.title,
    summary: a.summary,
    link: a.link,
    internal: a.link.startsWith('/'),
    english: false,
  }));
  const [lab, sky] = await Promise.all([contentLab(), bluesky()]);
  return [...own, ...lab, ...sky]
    .filter((e) => e.title && !isNaN(new Date(e.date).getTime()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
