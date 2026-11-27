import { NextResponse } from 'next/server';
import { getNews, SITE } from '@/lib/news';

// RSS feed of the News page (/news): NeuroTechX announcements, Content Lab posts and Bluesky
// posts, newest first. Served at https://neurotechx.org/feed.xml (this address used to mirror
// Bluesky only; it is kept so existing subscriptions keep working). Refreshes every 30 min.
export const revalidate = 1800;

const SOURCE_LABEL = { announcement: 'Announcement', contentLab: 'Content Lab', bluesky: 'Bluesky' } as const;

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    // Characters not allowed in XML 1.0
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g, '');
}

// Announcements can share a link (two items about /learn), so their guid is the item's date.
const guid = (id: string, isPermaLink: boolean) =>
  `<guid isPermaLink="${isPermaLink}">${esc(id)}</guid>`;

export async function GET() {
  const news = await getNews('en', 30);

  const items = news
    .map((n) => {
      const link = n.internal ? `${SITE}${n.link}` : n.link;
      return `    <item>
      <title>${esc(n.title)}</title>
      <link>${esc(link)}</link>
      ${guid(n.internal ? `${SITE}/news#${n.date}` : link, !n.internal)}
      <pubDate>${new Date(n.date).toUTCString()}</pubDate>
      <category>${SOURCE_LABEL[n.source]}</category>
      <description>${esc(n.summary || n.title)}</description>
    </item>`;
    })
    .join('\n');

  const lastBuild = news[0] ? new Date(news[0].date).toUTCString() : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NeuroTechX News</title>
    <link>${SITE}/news</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>News from NeuroTechX: announcements, Content Lab posts and Bluesky posts.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
